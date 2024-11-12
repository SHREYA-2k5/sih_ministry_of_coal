import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Divider } from '@mui/material';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock employee details
  const employee = {
    name: `Employee ${id}`,
    id,
    position: 'Coal Miner',
    department: 'Mining Operations',
    hireDate: '2021-05-01',
    email: 'employee@example.com',
    phone: '+1234567890',
    address: '123 Coal Mine Road, Mineville, CO',
    image: 'https://via.placeholder.com/150',
    summary: `A dedicated and hardworking Coal Miner with over 3 years of experience in mining operations. Known for exceptional safety record and expertise in operating heavy machinery. Always striving for excellence in all mining tasks and committed to upholding the highest standards of safety and productivity.`,
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        maxWidth: { xs: '100%', sm: 600, md: 800 }, // Responsive width
        mx: 'auto',
        borderRadius: 3,
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          alignSelf: 'flex-start',
          mb: 2,
          color: 'white',
          borderColor: 'white',
          '&:hover': {
            borderColor: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        Back
      </Button>
      <Typography variant="h3" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
        Employee Details
      </Typography>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 2, px: 2 }}>
          {employee.summary}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3 }}>
        <img
          src={employee.image}
          alt={employee.name}
          style={{ width: 150, height: 150, borderRadius: '50%' }}
        />
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {employee.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>ID:</strong> {employee.id}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Position:</strong> {employee.position}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Department:</strong> {employee.department}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Hire Date:</strong> {employee.hireDate}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {employee.email}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Phone:</strong> {employee.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {employee.address}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 3, width: '100%' }} />
      <Typography variant="body2" color="gray" sx={{ textAlign: 'center' }}>
        All information is based on the current employee records.
      </Typography>
    </Box>
  );
};

export default EmployeeDetails;
