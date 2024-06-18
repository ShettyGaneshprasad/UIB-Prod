import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        backgroundColor: "#00283C",
        textAlign: "center",
        width:"100%",
      }}
    >
      <Typography variant="body2" color="#F7F5F9">
      © Copyright 2024. All rights reserved UIB Insurance Brokers (India)
        Private Limited.
      </Typography>
    </Box>
  );
};

export default Footer;
