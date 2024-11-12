import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logRoutes from './routes/ShiftRoutes.js';
import { createShiftLogsTable } from './models/ShiftModel.js';

const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', logRoutes);

const initializeDatabase = async () => {
  try {
    await createShiftLogsTable();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
};

initializeDatabase();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
