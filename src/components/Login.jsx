import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import Button from "@mui/material/Button";
import "./Login.css";
import Footer from "./Footer";

const Login = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        console.log("Login successful:", res);
        localStorage.setItem("token", res.accessToken);
      })
      .catch((e) => {
        console.error("Login failed:", e);
      });
  };

  if (isAuthenticated) {
    console.log("User is authenticated, redirecting to /home");
    return <Navigate to="/home" />;
  }

  return (
    <div className="loginContainer">
      {/* <div className="loginBox"> */}
        <header>
          <img
            className="logoStyle"
            src="https://uibgroup.b-cdn.net/wp-content/uploads/2019/11/UIB_logo_white.svg"
            alt="Logo"
          />
        </header>
        <div className="loginContent">
          <img
            src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg"
            alt="Authentication Image"
          />
          <p><strong>Hello! Welcome back to UIB Insurance Analytics portal</strong></p>
          <Button className="customLoginButton" variant="outlined" onClick={handleLogin}>
            Log in to access your account and discover valuable insights
          </Button>
        </div>
        <Footer />
      {/* </div> */}
    </div>
  );
};

export default Login;
