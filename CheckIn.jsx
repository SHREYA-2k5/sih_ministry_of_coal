import React from 'react';
import { styled } from "@mui/material/styles";
import PreForm from '../components/PreForm'

const GlassBackgroundContainer = styled('div')(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)", 
  borderRadius:"10px", 
  width: "100%",
}));

const ShiftPage = () => {
  return (
      <GlassBackgroundContainer style={{marginTop: "30%"}}>
        <h1>Enter your Shift Details</h1>
        <PreForm />
      </GlassBackgroundContainer>
  );
};

export default ShiftPage;