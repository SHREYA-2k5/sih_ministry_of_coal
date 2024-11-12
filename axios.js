import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', 
  headers: {
    'Content-Type': 'application/json',
  }
});

export const saveLog = async (logEntry) => {
  try {
    const response = await api.post('/save', logEntry);
  } catch (error) {
    console.error('Error saving log entry:', error);
  }
};

export const printLog = async (shiftNumber) => {
  try {
    const response = await api.get(`/print/${shiftNumber}`,{responseType: 'arraybuffer'});
    return response; 
  } catch (error) {
    console.error('Error fetching log entries:', error);
  }
};

export const fetchPreview = async () => {
  try {
    const response = await api.get('/preview');
    return response.data; 
  } catch (error) {
    console.error('Error fetching shifts preview:', error);
  }
};
