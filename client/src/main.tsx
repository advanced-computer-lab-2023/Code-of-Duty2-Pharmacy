import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CustomThemeProvider } from "./contexts/ThemeContext.tsx";
import axios from "axios";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CustomThemeProvider>
          <CssBaseline>
            <App />
          </CssBaseline>
        </CustomThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
