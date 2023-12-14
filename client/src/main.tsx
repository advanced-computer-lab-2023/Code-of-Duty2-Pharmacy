import ReactDOM from "react-dom/client";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import App from "./App.tsx";
import "./index.css";
import { CustomThemeProvider } from "./contexts/ThemeContext.tsx";
import React from "react";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <CssBaseline>
          <App />
        </CssBaseline>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
