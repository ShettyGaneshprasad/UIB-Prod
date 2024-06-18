import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import Login from "./components/Login";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import LeftNavigation from "./components/LeftNavigation";
import Header from "./components/Header";
import Box from "@mui/material/Box";

const App = () => {
  const isAuthenticated = useIsAuthenticated();
  const [PowerBIReports,setPowerBIReports]=useState([]);
  const [PowerBIWorkspace,setPowerBIWorkspace]=useState("6d18c8fd-24e1-4026-a616-640d3647474f");
  const [ReportSelectedFromDropDown,setReportSelectedFromDropDown]=useState({
    reportId:null,
    reportName:null
  });
  useEffect(() => {
   console.log(ReportSelectedFromDropDown)
  }, [PowerBIReports,ReportSelectedFromDropDown])
  
  return (
    <Router>
      {isAuthenticated && (
        <>
          <Header />
          <Box sx={{ display: "flex" }}>
            <LeftNavigation setPowerBIReports={setPowerBIReports} setReportSelectedFromDropDown={setReportSelectedFromDropDown} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/home" element={<Home ReportSelectedFromDropDown={ReportSelectedFromDropDown} PowerBIWorkspace={PowerBIWorkspace} />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </Box>
          </Box>
        </>
      )}
      {!isAuthenticated && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
