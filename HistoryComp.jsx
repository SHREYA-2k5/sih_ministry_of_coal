import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid2 } from '@mui/material';
import { fetchPreview, printLog } from '../axios';

const HistoryComp = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const data = await fetchPreview();
        setShifts(data);
      } catch (error) {
        console.error('Error fetching shift preview:', error);
      }
    };

    fetchShifts();
  }, []);
  
  console.log(shifts);

  const handleShiftSelection = (number) => {
    setSelectedShift(selectedShift === number ? null : number);
  };

  const handleDownload = async () => {
    if (selectedShift !== null) {
      try {
        const response = await printLog(selectedShift);
        // Handle the response, e.g., save the file or display it
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Shift_${selectedShift}_Report.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading log report:', error);
      }
    } else {
      console.warn('No shift selected');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Shift Log History
      </Typography>
      <Grid2 container spacing={3}>
        {shifts.map((shift) => (
          <Grid2 item xs={12} sm={6} md={4} key={shift.shiftnumber}>
            <Box
              p={2}
              border={1}
              borderColor="grey.300"
              borderRadius={2}
              bgcolor={selectedShift === shift.shiftnumber ? 'lightblue' : 'inherit'}
              onClick={() => handleShiftSelection(shift.shiftnumber)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="h6">Shift Number: {shift.shiftnumber}</Typography>
              <Typography>Manager Name: {shift.manager}</Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleDownload}
        disabled={selectedShift === null}
      >
        Download Report
      </Button>
    </Box>
  );
};

export default HistoryComp;
