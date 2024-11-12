import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Drawer from './components/Drawer';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import CheckIn from './pages/CheckIn';
import CheckOut from './pages/CheckOut';
import History from './pages/History';
import EmployeeDetails from './components/EmployeeDetails'; 
import ShiftLogForm from './components/LogEntryForm'; 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Import images from src directory
import dashboardBg from './assets/coal mine.jpg';
import shiftBg from './assets/coalmine1.jpg';
import reportBg from './assets/coalmine2.jpg';
import historyBg from './assets/coalmine3.jpg';
import loginBg from './assets/coalmine4.jpg';
import { Padding } from '@mui/icons-material';

const backgroundImages = {
  "/dashboard": `url(${dashboardBg})`,
  "/shift": `url(${shiftBg})`,
  "/report": `url(${reportBg})`,
  "/history": `url(${historyBg})`,
  "/": `url(${loginBg})`, 
};

const FullScreenBackgroundContainer = styled(Box)(({ backgroundImage }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100%',
  opacity: '70%',
  background: `${backgroundImage} no-repeat center center fixed`,
  backgroundSize: 'cover',
}));

const AppRouter = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const backgroundImage = backgroundImages[location.pathname] || backgroundImages["/"];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FullScreenBackgroundContainer backgroundImage={backgroundImage} />
      {!isLoginPage && <Drawer />}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/clockin" element={<CheckIn />} />
        <Route path="/clockout" element={<CheckOut/>} />
        <Route path="/history" element={<History />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/shift-log" element={<ShiftLogForm />} /> 
      </Routes>
    </Box>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default Router;
