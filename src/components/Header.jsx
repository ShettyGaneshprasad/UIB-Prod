import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Icon } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useMsal } from "@azure/msal-react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { instance, accounts } = useMsal();
  const username = accounts[0] && accounts[0].username;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    instance
      .logoutPopup()
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        console.error(e);
      });
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };
 
  return (
    <AppBar position="static" sx={{ backgroundColor: "#00283C" }}>
      <Toolbar>
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon/>
        </IconButton> */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img
            src="https://uibgroup.b-cdn.net/wp-content/uploads/2019/11/UIB_logo_white.svg"
            alt="Logo"
            // style={{ logoStyle }}
            className="logoStyle"
          />
        </Typography>
        <Box sx={{ marginLeft: "auto" }}>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableElevation
            onClick={handleClick}
            startIcon={<AccountCircle />}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ color: "white", marginRight: "12px;" }}
          >
            {username}
          </Button>
          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                // handleClose();
                handleLogout();
              }}
              disableRipple
            >
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
