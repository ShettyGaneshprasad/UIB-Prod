import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ListItemText from "@mui/material/ListItemText";
const PBIWorkspace = () => {
  const [workspace, setWorkspace] = useState([]);
  // useEffect(() => {
  //   async function getWorkspaces(accessToken) {
  //     const response = await fetch('https://api.powerbi.com/v1.0/myorg/groups', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
    
  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(`Error fetching workspaces: ${error.error.message}`);
  //     }
    
  //     const data = await response.json();
  //     return data.value; // This contains the list of workspaces
  //   }
  //   getWorkspaces("H4sIAAAAAAAEACWUx66DVgBE_-VtiWRMuYZIWVBMb6bDjnoB0ztE-fc8JZtZHWmko9H8_WMlVzsk-c-fP6MC1z2nxy26s2NiS321bdFOdQ01mfZVf5vDCh4rMUUuhQGYNiEZz8RWbmS3KdFRbe7ihBLe7wCvqCCQEcRhz7fepY7sfsz1I9rR8dVpKPDZJM05RYpo1hQN_UyUmq6lUR8IoAr4V1btR-4xJhUeoLIruqjsppBBi-K8WBUZ0tipAD-eKic-IV7GmiXAsRrkNVNqKx2iVV1U9MFKdTVAwLOfOE8IXKKFko2or8gxUO8tOKCHJ5P-Yi9Ljz4xI1nJDW5E3HHYBlgOmiXfB3e4oF5L2LTUt-ySUsSSi1Jhqdg34uT7BR26WUpdwlyiLK6KMrpaDIsv6oX-ZjTCR738ZUQDqihT4_G4CyVr07aV-o7ivCM5LFmD-yhyyJN6JPnKK_6JSs4UGnbhR8atdfMe7q4QmL6EIqlQk9ol0Pbma7O4wTm4vjN8KROznil_1U9WdmqRicap5u2vQCDwXTXcUJQPK5rANCxGWiEZjOWeYBY23L3AXClYstRILEMtj9UoUKNuU7Mmyc7xXba2f4ssI7Omccg1I0N05MCH--2SvKOVEP3yZKfVNk1Od81iAnaiwTGlB6vUX56lbtGw6oC4VeyUbise8WW_l4hoHIu6FYTn3wB1k9vpgy13ovfRHWNgzb1Dc2u8qCtApuR-rC9zjzRa_DxvxrP9ukwySGzvldZeplmBrNlKLAATR2DPj5ltd2ZRgq-Fj43qhXDmecbSI6aT6-CmUlJrtMBbqg3DoGvbqfzXzx8_3HyN66AW1-_0U5MRP5b-2MTtIP0dY5WUiGm06IdU6EV8EXzwMY3FIoKWPF5YPHTkSN1hvSNqV6Nq4h-Phl5XSUcrzB5JzLcCVlP1jsZP7G5e8aEFSy3zWZMAw0AOsz-qVc6Q4VIqGm7kJD0fsieDvN8dAB0KzRmftsRQI5sibqDxkLWiSKRL620QXCKITG6JgZychv91U660UHd_3-VaxNEUOL1YRykjFeRzmnoI57wK1UpDXtHvMh6ckRWi7voGisWU9i6ODr-WkwLKnTsnr8SodN8gzL6OlfcoUSi5DMRaadUYt_m2sqCWbea2qhnD_abt7-GlNfzb6gCk6wRltW-lQce-6UhM4F__ab7Gqphl_9fyC2ZOW1sKwwVEGYF8d54X_j_l1LBP1m0ufjGebkDKFpLbkF3GMwE39aZ8DczcDMXlAB23imhUzCYd1LeR4PROlkdku7gm4py3SUOb0y5CoL5PqVKokEGNPHAIrt4D4sdNzwRIoKi78RyZ7oz9Ns_zHdHfQxrf46svjPfgL6e8WR8s2tfSEXTzc9oCXhcflbyftkuF320ffJrw5Ac5beYn2ASOo6K9K8OnYPaur3jQQYvkHIengp-0K84W0jTb6QVOl-3zJF1hlCb1ss7uh-RGcdSW0_p9U9jrQs-T7KtVkPqp9573vs1Wzp8VrAjmvgtB5lq6VbXFIN43KaevlECuhqbmsTidGVXJdOvmwoVNo1IkQ1nfydSumHHMV8_8av7nX0ZqHivuBQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzE4NTMyNTMwLCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=")
  // }, [])
 
  return (
    <Box sx={{ width: 200 }} role="presentation">
      <List>
        <Typography variant="h6" sx={{ padding: "16px" }}>
          Workspaces
        </Typography>
        {workspace.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WarehouseIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default PBIWorkspace;
