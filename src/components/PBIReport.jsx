import React, { useState, useEffect } from "react";
import axios from "axios";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import "../index.css"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const PBIReport = ({setPowerBIReports,setReportSelectedFromDropDown}) => {
  const [PBIReportsOfWorkspace, setPBIReportsOfWorkspace] = useState([]);
 const [selectedReport,setSelectedReport]=useState()
  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMjhlMjhjMTMtNjA0Yi00NjVmLTk2MjQtNTJiNzNhYzdmNDZmLyIsImlhdCI6MTcxODYwNDYyMiwibmJmIjoxNzE4NjA0NjIyLCJleHAiOjE3MTg2MDk1MDUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUE3ck5KN2hhV1QzdUw3My9FTy9nSUt4QmVGbW5NZTlNL21xTVJBaHFpcmRxR05SRXNaVmM5TFRGbVJvSlR4WU5oYTM1VHJTTUxTVFNSbTREQlJYRmY4OFdrRU9Vd2s0QnBlRWtqR3ZEbXh1Zz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJSZXBvcnRpbmciLCJnaXZlbl9uYW1lIjoiUG93ZXIgQkkiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODAuMTUxLjMuOTIiLCJuYW1lIjoiUG93ZXIgQkkgIFJlcG9ydGluZyIsIm9pZCI6IjQxYjM0ODI3LTRhM2QtNDhjMS1iZTEyLWQ5NjkzOTU0NzQyYSIsInB1aWQiOiIxMDAzMjAwMzU0OUE3MEU0IiwicmgiOiIwLkFYQUFFNHppS0V0Z1gwYVdKRkszT3NmMGJ3a0FBQUFBQUFBQXdBQUFBQUFBQUFERUFPRS4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBJdGVtLkV4ZWN1dGUuQWxsIEl0ZW0uUmVhZFdyaXRlLkFsbCBJdGVtLlJlc2hhcmUuQWxsIE9uZUxha2UuUmVhZC5BbGwgT25lTGFrZS5SZWFkV3JpdGUuQWxsIFBpcGVsaW5lLkRlcGxveSBQaXBlbGluZS5SZWFkLkFsbCBQaXBlbGluZS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFJlcHJ0LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5HaXRDb21taXQuQWxsIFdvcmtzcGFjZS5HaXRVcGRhdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6InRaSzFMNXZIUFhEeDRITGFydmZHbTR2WnEzNWN6dmVIZWYtT2ZCd0JwLXciLCJ0aWQiOiIyOGUyOGMxMy02MDRiLTQ2NWYtOTYyNC01MmI3M2FjN2Y0NmYiLCJ1bmlxdWVfbmFtZSI6ImJpX21pc0B1aWJpbmRpYS5jb20iLCJ1cG4iOiJiaV9taXNAdWliaW5kaWEuY29tIiwidXRpIjoiZDljNlRvcENsRWVNLXJJMHRHY2FBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgMjIifQ.bWlcarb6kX-gfQ_ZDumrf1cUofqRu7wfoGRzV_GyHydupxvVGIVFncHdg9fA05lWiYbqq1QuFyFW_GwW6exo0zChyOcjC1HsehC6Q2rAnmhMVitvfDQW3Bd74ICOBgSlo6u2Hk1qoWiu1_uBbDc0Z0dZqRXqr8Lx7F50htmg5OlOrE_31gjPaLg98SMBivpyOxr3afF_gD8Q_otxGDu9xZgS29TsMjjsQWuXpIXlc-G-l92cT6CxHvmG3v25ZN-w-QUS1ZajXvY5voYUJ9ROId-or-c_N1EmAyrF_ifolvoS3_IR8Yz2k0CiMszkBUVHk8RFATZmY8M78Vzs2Mwt1w";
  useEffect(() => {
    const workspaceId = "6d18c8fd-24e1-4026-a616-640d3647474f";
    // Fetch list of reports in the workspace
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports`,
          {
            headers: {
              Authorization:`Bearer ${accessToken}`, 
            //   `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Reports:", response.data.value);
        setPBIReportsOfWorkspace(response.data.value);
        setPowerBIReports(response.data.value);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [accessToken]);
  const handleReportChange=(event)=>{
    const reportId = event.target.value;
    const selectedReport = PBIReportsOfWorkspace.find(report => report.id === reportId);

    if (selectedReport) {
      setReportSelectedFromDropDown({
        reportId: selectedReport.id,
        reportName: selectedReport.name
      });
      setSelectedReport(reportId);
    }
  }
  return (
    <div className="Report_Dropdown_Container">
      
      <FormControl fullWidth>
        <InputLabel id="report-select-label">Select a Report</InputLabel>
        <Select
          labelId="report-select-label"
          id="report-select"
          value={selectedReport}
          onChange={handleReportChange}
          label="Select a Report"
        >
          {PBIReportsOfWorkspace.map((report) => (
            <MenuItem key={report.id} value={report.id}>
              {report.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default PBIReport;
