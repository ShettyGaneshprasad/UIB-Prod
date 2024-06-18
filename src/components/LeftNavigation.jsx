import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PBIWorkspace from "./PBIWorkspace";
import PBIReport from "./PBIReport";
export default function LeftNavigation({setPowerBIReports,setReportSelectedFromDropDown}) {

  const [reports, setReports] = useState([]);
 
  
  return (
    <Box sx={{ width: 200 }} role="presentation" >
     <PBIReport  setPowerBIReports={setPowerBIReports} setReportSelectedFromDropDown={setReportSelectedFromDropDown}/>
    </Box>
  );
}
