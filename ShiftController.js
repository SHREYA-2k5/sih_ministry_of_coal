import { saveShiftLog, getLogsByShiftNumber } from '../models/ShiftModel.js';
import PDFDocument from 'pdfkit';
import pool from '../db.js';

//for /api/save
export const saveLogEntry = async (req, res) => {

  const {
    date,
    shiftNumber,
    manager,
    time,
    issues,
    remarks,
    oxygen,
    methane,
    monoxide,
    ventilation,
    integrity,
    selectedEmployees,
    logType
  } = req.body;

  try {
    const logEntry = await saveShiftLog(req.body);
    res.status(200).json(logEntry);
  } catch (error) {
    console.error('Error saving log entry:', error);
    res.status(500).json({ error: 'Error saving log entry', details: error.message });
  }
};

//for /api/preview
export const getPreview = async (req, res) => {
  let client;
  try {
    client = await pool.connect();    
    const result = await client.query(
      `SELECT DISTINCT ON (shiftNumber) shiftNumber, manager, date FROM shift_logs ORDER BY shiftNumber, date;`
    );    
    return res.status(200).json(result.rows); 
  } catch (error) {
    console.error('Error fetching shifts preview:', error);
    return res.status(500).json({ error: 'Error fetching shifts preview', details: error.message });
  } finally {
    if (client) {
      client.release();
    }
  }
};


//for /api/save
export const printLogEntries = async (shiftNumber, res) => {

  if (!shiftNumber) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const logs = await getLogsByShiftNumber(shiftNumber);
    const doc = new PDFDocument();
    let buffers = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => { 
      const pdfData = Buffer.concat(buffers);
      res.contentType('application/pdf');
      res.send(pdfData);
    });
    
    doc.fontSize(16).text(`Shift Log Report for Shift Number: ${shiftNumber}`, { align: 'center' });
    doc.moveDown();
    
    const formatDate = (date) => {
      const d = new Date(date);
      const day = (`0${d.getDate()}`).slice(-2);
      const month = (`0${d.getMonth() + 1}`).slice(-2);
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };
    
    const formatEmployees = (employees) => employees.join(', ');
    
    const createTable = (logs) => {
      logs.forEach(log => {
        doc.fontSize(12).text(`Date: ${formatDate(log.date)}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Shift Number: ${log.shiftnumber}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Manager: ${log.manager}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`${log.logtype === 'clock_in' ? 'Entry' : 'Exit'} Time: ${log.time}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Issues: ${log.issues}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Remarks: ${log.remarks}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Oxygen: ${log.oxygen}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Methane: ${log.methane}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Monoxide: ${log.monoxide}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Ventilation: ${log.ventilation}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Integrity: ${log.integrity}`, {continued: true}).text(' ', {width: 100});
        doc.fontSize(12).text(`Present Employees: ${formatEmployees(log.selectedemployees)}`);
        doc.moveDown();
      });
    };
    
    doc.fontSize(14).text('Clock-in Log', { underline: true });
    doc.moveDown();
    
    const clockInLogs = logs.filter(log => log.logtype === 'clock_in');    
    if (clockInLogs.length > 0) {
      createTable(clockInLogs);
    } else {
      doc.fontSize(12).text('No clock-in logs available.');
    }
    
    doc.moveDown().moveDown();
    doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown().moveDown();
    
    doc.fontSize(14).text('Clock-out Log', { underline: true });
    doc.moveDown();
    
    const clockOutLogs = logs.filter(log => log.logtype === 'clock_out');
    if (clockOutLogs.length > 0) {
      createTable(clockOutLogs);
    } else {
      doc.fontSize(12).text('Shift still in progress');
    }
    
    doc.end();
    

  } catch (error) {
    console.error('Error printing log entries:', error);
    res.status(500).json({ error: 'Error printing log entries', details: error.message });
  }
};
