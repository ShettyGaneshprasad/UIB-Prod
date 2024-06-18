// src/authConfig.js

export const msalConfig = {
    auth: {
      // clientId: "3fc9d16b-7172-4320-9bb0-5d42d7e36cc5", // Your Azure AD Application (client) ID
      clientId: "3fc9d16b-7172-4320-9bb0-5d42d7e36cc5", // Your Azure AD Application (client) ID
      authority: "https://login.microsoftonline.com/28e28c13-604b-465f-9624-52b73ac7f46f", // Your tenant info
      redirectUri: "http://localhost:3000", // The redirect URI set in Azure AD
    },
    cache: {
      cacheLocation: "localStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };
  
  export const loginRequest = {
    scopes: ["User.Read","reports.read.all"], // The scopes you want to request
  };
  