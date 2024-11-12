import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import StudentOperations from "./dasview";

const GlassBackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)", // glass background color
  backdropFilter: "blur(10px)", // blur effect
  borderRadius: "10px", // rounded corners
  padding: "20px", // padding
  width: "80%", // width
  margin: "40px auto", // center horizontally
}));

const HomePage = () => {
  return (
    <GlassBackgroundContainer>
      <h1 style={{ marginTop: "30%" }}>Overview</h1>
      <StudentOperations />
    </GlassBackgroundContainer>
  );
};

export default HomePage;