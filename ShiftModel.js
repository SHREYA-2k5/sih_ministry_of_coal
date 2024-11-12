import pool from '../db.js';

const createShiftLogsTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS shift_logs (
        id SERIAL PRIMARY KEY,
        date DATE,
        shiftNumber VARCHAR(10),
        manager TEXT,
        time TEXT,
        issues TEXT,
        remarks TEXT,
        oxygen NUMERIC, 
        methane NUMERIC,
        monoxide NUMERIC,
        ventilation NUMERIC,
        integrity NUMERIC,
        selectedEmployees JSONB,
        logType VARCHAR(10) CHECK (logType IN ('clock_in', 'clock_out'))
      );
    `);
  } finally {
    client.release();
  }
};

const saveShiftLog = async (logData) => {
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
  } = logData;

  const client = await pool.connect();
  try {
    const existingEntry = await client.query(
      `SELECT * FROM shift_logs WHERE shiftNumber = $1 AND logType = $2`,
      [shiftNumber, logType]
    );

    if (existingEntry.rows.length > 0) {
      // Update the existing entry
      const result = await client.query(
        `UPDATE shift_logs
         SET date = $1, manager = $2, time = $3, issues = $4, remarks = $5, oxygen = $6,
             methane = $7, monoxide = $8, ventilation = $9, integrity = $10,
             selectedEmployees = $11
         WHERE shiftNumber = $12 AND logType = $13
         RETURNING *`,
        [date, manager, time, issues, remarks, oxygen, methane, monoxide, ventilation, integrity, JSON.stringify(selectedEmployees), shiftNumber, logType]
      );
      return result.rows[0];
    } else {
      // Insert a new entry if none exists
      const result = await client.query(
        `INSERT INTO shift_logs (date, shiftNumber, manager, time, issues, remarks, oxygen, methane, monoxide, ventilation, integrity, selectedEmployees, logType)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [date, shiftNumber, manager, time, issues, remarks, oxygen, methane, monoxide, ventilation, integrity, JSON.stringify(selectedEmployees), logType]
      );
      return result.rows[0];
    }
  } catch (error) {
    console.error('Error saving shift log:', error);
    throw error;
  } finally {
    client.release();
  }
};

const getLogsByShiftNumber = async (shiftNumber) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM shift_logs WHERE shiftNumber = $1`,
      [shiftNumber]
    );
    return result.rows;
  } catch (error) {
    console.error('Error getting logs by shift number:', error);
    throw error;
  } finally {
    client.release();
  }
};

export { createShiftLogsTable, saveShiftLog, getLogsByShiftNumber };
