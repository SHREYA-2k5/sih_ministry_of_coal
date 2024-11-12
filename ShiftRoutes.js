import express from 'express';
import { saveLogEntry, printLogEntries, getPreview } from '../controllers/ShiftController.js';

const router = express.Router();

//Saves form data to table
router.post('/save', async (req, res) => {
  try {
    const logData = req.body;    
    const savedLog = await saveLogEntry(req,res); 
    
    res.status(200).json(savedLog);
  } catch (error) {
    res.status(500).json({ error: 'Error saving log entry' });
  }
});

//Fetches data for the history page
router.get('/preview', async (req, res) => {
  try {
    await getPreview(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shifts preview' });
  }
});

//Generates the pdf and streams to client
router.get('/print/:shiftNumber', async (req, res) => {
  const { shiftNumber } = req.params;
  
  try {
    await printLogEntries(shiftNumber, res);
  } catch (error) {
    res.status(500).json({ error: 'Error generating PDF report' });
  }
});

export default router;
