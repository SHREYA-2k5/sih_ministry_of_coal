import React from 'react';
import { styled } from "@mui/material/styles";
import MineSafetyCheck from "../components/MineSafetyCheck";
import PostForm from "../components/PostForm";
import { Check } from '@mui/icons-material';

const GlassBackgroundContainer = styled('div')(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)", 
  borderRadius:"10px", 
  width: "100%",
}));

const CheckOut = () => {
  return (
    <GlassBackgroundContainer style={{marginTop: "30%"}}>
      <h1>Enter your Shift Details</h1>
      <PostForm />
    </GlassBackgroundContainer>
  );
};

export default CheckOut;