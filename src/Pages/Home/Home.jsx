import React, { useEffect, useState } from "react";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import axios from "axios";

const Home = ({ ReportSelectedFromDropDown, PowerBIWorkspace }) => {
  const [isReportSelected, setReportSelected] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    type: "report",
    embedUrl: undefined,
    accessToken: undefined,
    id: undefined,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
      },
      background: models.BackgroundType.Transparent,
    },
  });

  useEffect(() => {
    // console.log("ocalstorge", localStorage.getItem("token"));
    let embedToken = "";
    let data = JSON.stringify({
      accessLevel: "View",
    });

    const authToken =
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMjhlMjhjMTMtNjA0Yi00NjVmLTk2MjQtNTJiNzNhYzdmNDZmLyIsImlhdCI6MTcxODYwNDYyMiwibmJmIjoxNzE4NjA0NjIyLCJleHAiOjE3MTg2MDk1MDUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUE3ck5KN2hhV1QzdUw3My9FTy9nSUt4QmVGbW5NZTlNL21xTVJBaHFpcmRxR05SRXNaVmM5TFRGbVJvSlR4WU5oYTM1VHJTTUxTVFNSbTREQlJYRmY4OFdrRU9Vd2s0QnBlRWtqR3ZEbXh1Zz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJSZXBvcnRpbmciLCJnaXZlbl9uYW1lIjoiUG93ZXIgQkkiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODAuMTUxLjMuOTIiLCJuYW1lIjoiUG93ZXIgQkkgIFJlcG9ydGluZyIsIm9pZCI6IjQxYjM0ODI3LTRhM2QtNDhjMS1iZTEyLWQ5NjkzOTU0NzQyYSIsInB1aWQiOiIxMDAzMjAwMzU0OUE3MEU0IiwicmgiOiIwLkFYQUFFNHppS0V0Z1gwYVdKRkszT3NmMGJ3a0FBQUFBQUFBQXdBQUFBQUFBQUFERUFPRS4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBJdGVtLkV4ZWN1dGUuQWxsIEl0ZW0uUmVhZFdyaXRlLkFsbCBJdGVtLlJlc2hhcmUuQWxsIE9uZUxha2UuUmVhZC5BbGwgT25lTGFrZS5SZWFkV3JpdGUuQWxsIFBpcGVsaW5lLkRlcGxveSBQaXBlbGluZS5SZWFkLkFsbCBQaXBlbGluZS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFJlcHJ0LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5HaXRDb21taXQuQWxsIFdvcmtzcGFjZS5HaXRVcGRhdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6InRaSzFMNXZIUFhEeDRITGFydmZHbTR2WnEzNWN6dmVIZWYtT2ZCd0JwLXciLCJ0aWQiOiIyOGUyOGMxMy02MDRiLTQ2NWYtOTYyNC01MmI3M2FjN2Y0NmYiLCJ1bmlxdWVfbmFtZSI6ImJpX21pc0B1aWJpbmRpYS5jb20iLCJ1cG4iOiJiaV9taXNAdWliaW5kaWEuY29tIiwidXRpIjoiZDljNlRvcENsRWVNLXJJMHRHY2FBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgMjIifQ.bWlcarb6kX-gfQ_ZDumrf1cUofqRu7wfoGRzV_GyHydupxvVGIVFncHdg9fA05lWiYbqq1QuFyFW_GwW6exo0zChyOcjC1HsehC6Q2rAnmhMVitvfDQW3Bd74ICOBgSlo6u2Hk1qoWiu1_uBbDc0Z0dZqRXqr8Lx7F50htmg5OlOrE_31gjPaLg98SMBivpyOxr3afF_gD8Q_otxGDu9xZgS29TsMjjsQWuXpIXlc-G-l92cT6CxHvmG3v25ZN-w-QUS1ZajXvY5voYUJ9ROId-or-c_N1EmAyrF_ifolvoS3_IR8Yz2k0CiMszkBUVHk8RFATZmY8M78Vzs2Mwt1w";
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://api.powerbi.com/v1.0/myorg/groups/${PowerBIWorkspace}/reports/${ReportSelectedFromDropDown.reportId}/GenerateToken`,
      headers: {
        "Content-Type": "application/json",
        Authorization: 
        authToken
        // `Bearer ${localStorage.getItem("token")}`,
        // 'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMjhlMjhjMTMtNjA0Yi00NjVmLTk2MjQtNTJiNzNhYzdmNDZmLyIsImlhdCI6MTcxNzc0OTM5NywibmJmIjoxNzE3NzQ5Mzk3LCJleHAiOjE3MTc3NTUwMzAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84V0FBQUFndmtVYnFrTVlOSXNWSTRhUUU3Z0FMc1FsT1hOMG1CcmpkVGk5Q2VBeWNRYm1LaENpSk9XcUNCcFZqQ1JFQWF2cndVcTVhUkkyS1VNOGMrdTdNWHlTSFJXVStoYVh1ejM1dkJnVUhlNnBLWT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJSZXBvcnRpbmciLCJnaXZlbl9uYW1lIjoiUG93ZXIgQkkiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODAuMTUxLjMuOTAiLCJuYW1lIjoiUG93ZXIgQkkgIFJlcG9ydGluZyIsIm9pZCI6IjQxYjM0ODI3LTRhM2QtNDhjMS1iZTEyLWQ5NjkzOTU0NzQyYSIsInB1aWQiOiIxMDAzMjAwMzU0OUE3MEU0IiwicmgiOiIwLkFYQUFFNHppS0V0Z1gwYVdKRkszT3NmMGJ3a0FBQUFBQUFBQXdBQUFBQUFBQUFERUFPRS4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBJdGVtLkV4ZWN1dGUuQWxsIEl0ZW0uUmVhZFdyaXRlLkFsbCBJdGVtLlJlc2hhcmUuQWxsIE9uZUxha2UuUmVhZC5BbGwgT25lTGFrZS5SZWFkV3JpdGUuQWxsIFBpcGVsaW5lLkRlcGxveSBQaXBlbGluZS5SZWFkLkFsbCBQaXBlbGluZS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFJlcHJ0LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5HaXRDb21taXQuQWxsIFdvcmtzcGFjZS5HaXRVcGRhdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6InRaSzFMNXZIUFhEeDRITGFydmZHbTR2WnEzNWN6dmVIZWYtT2ZCd0JwLXciLCJ0aWQiOiIyOGUyOGMxMy02MDRiLTQ2NWYtOTYyNC01MmI3M2FjN2Y0NmYiLCJ1bmlxdWVfbmFtZSI6ImJpX21pc0B1aWJpbmRpYS5jb20iLCJ1cG4iOiJiaV9taXNAdWliaW5kaWEuY29tIiwidXRpIjoiYVdKRzJwYVBQVU9manlfNEtsTVNBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.kFD0yLb-AD9ZXjiicflzjIuyzf3lIO0sPgTVSeHihT_tftqC199TKBSD0pch7LNCcWZLzaUVzfzdNxtg_CxRt2AsY9rZwqBqZm6XJjcMf9DD0fjZaHd3w5GXu4hyeNFy88reLzctMggowuzMiVW0jNFQbIMPSKuCIDVEPI-DrOnPXkuU7l6Der_8G5PJQjbuH9kmXDIDHLLErzs2ouZZBc2yPyeR0IuYFJkiCvaSmr1m2AT3I3ajFWblXTp6HXvDNj2RY6kYyN4CAacfrm-N1QuGWx38PT3Js5BQIIe9NENdWO4TCAs6dl0mnO-PvcjQnIgeUjnRUkQZCK3Wah-q3g`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        embedToken = response.data.token;

        axios
      .get(
        `https://api.powerbi.com/v1.0/myorg/reports/${ReportSelectedFromDropDown.reportId}`,
        {
          headers: {
            Authorization: authToken
            // `Bearer ${localStorage.getItem("token")}`
            // 'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMjhlMjhjMTMtNjA0Yi00NjVmLTk2MjQtNTJiNzNhYzdmNDZmLyIsImlhdCI6MTcxNzc0OTM5NywibmJmIjoxNzE3NzQ5Mzk3LCJleHAiOjE3MTc3NTUwMzAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84V0FBQUFndmtVYnFrTVlOSXNWSTRhUUU3Z0FMc1FsT1hOMG1CcmpkVGk5Q2VBeWNRYm1LaENpSk9XcUNCcFZqQ1JFQWF2cndVcTVhUkkyS1VNOGMrdTdNWHlTSFJXVStoYVh1ejM1dkJnVUhlNnBLWT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJSZXBvcnRpbmciLCJnaXZlbl9uYW1lIjoiUG93ZXIgQkkiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODAuMTUxLjMuOTAiLCJuYW1lIjoiUG93ZXIgQkkgIFJlcG9ydGluZyIsIm9pZCI6IjQxYjM0ODI3LTRhM2QtNDhjMS1iZTEyLWQ5NjkzOTU0NzQyYSIsInB1aWQiOiIxMDAzMjAwMzU0OUE3MEU0IiwicmgiOiIwLkFYQUFFNHppS0V0Z1gwYVdKRkszT3NmMGJ3a0FBQUFBQUFBQXdBQUFBQUFBQUFERUFPRS4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBJdGVtLkV4ZWN1dGUuQWxsIEl0ZW0uUmVhZFdyaXRlLkFsbCBJdGVtLlJlc2hhcmUuQWxsIE9uZUxha2UuUmVhZC5BbGwgT25lTGFrZS5SZWFkV3JpdGUuQWxsIFBpcGVsaW5lLkRlcGxveSBQaXBlbGluZS5SZWFkLkFsbCBQaXBlbGluZS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFJlcHJ0LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5HaXRDb21taXQuQWxsIFdvcmtzcGFjZS5HaXRVcGRhdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6InRaSzFMNXZIUFhEeDRITGFydmZHbTR2WnEzNWN6dmVIZWYtT2ZCd0JwLXciLCJ0aWQiOiIyOGUyOGMxMy02MDRiLTQ2NWYtOTYyNC01MmI3M2FjN2Y0NmYiLCJ1bmlxdWVfbmFtZSI6ImJpX21pc0B1aWJpbmRpYS5jb20iLCJ1cG4iOiJiaV9taXNAdWliaW5kaWEuY29tIiwidXRpIjoiYVdKRzJwYVBQVU9manlfNEtsTVNBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.kFD0yLb-AD9ZXjiicflzjIuyzf3lIO0sPgTVSeHihT_tftqC199TKBSD0pch7LNCcWZLzaUVzfzdNxtg_CxRt2AsY9rZwqBqZm6XJjcMf9DD0fjZaHd3w5GXu4hyeNFy88reLzctMggowuzMiVW0jNFQbIMPSKuCIDVEPI-DrOnPXkuU7l6Der_8G5PJQjbuH9kmXDIDHLLErzs2ouZZBc2yPyeR0IuYFJkiCvaSmr1m2AT3I3ajFWblXTp6HXvDNj2RY6kYyN4CAacfrm-N1QuGWx38PT3Js5BQIIe9NENdWO4TCAs6dl0mnO-PvcjQnIgeUjnRUkQZCK3Wah-q3g`
          },
        }
      )
      .then((response) => {
        console.log("reponse", response);
        setReportConfig({
          ...reportConfig,
          embedUrl: response.data.embedUrl,
          accessToken: embedToken,
          id: response.data.id,
        });
      })
      .catch((error) => {
        console.log("emebed error", error);
      });
      })
      .catch((error) => {
        console.log(error);
      });

    
  }, [ReportSelectedFromDropDown]);

  return (
    <div>
      <h2>
        {ReportSelectedFromDropDown.reportName
          ? ReportSelectedFromDropDown.reportName
          : "Please select a report"}
      </h2>
      {/* {isReportSelected && (
        <PowerBIEmbed embedConfig={reportConfig} cssClassName="class-abc" />
      )} */}
      {ReportSelectedFromDropDown.reportName ? (
        <PowerBIEmbed embedConfig={reportConfig} cssClassName="class-abc" />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
