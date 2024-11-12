import React from "react";
import HistoryComp from "../components/HistoryComp";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const GlassBackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)", 
  backdropFilter: "blur(10px)", 
  borderRadius: "10px", 
  padding: "20px", 
  width: "80%", 
  margin: "40px auto", 
}));

const History = () => {
  return (
    <GlassBackgroundContainer>
      <h1>Shift Logs</h1>
      <HistoryComp />
    </GlassBackgroundContainer>
  );
};

export default History;