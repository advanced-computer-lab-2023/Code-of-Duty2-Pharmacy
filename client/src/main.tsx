import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CustomThemeProvider } from "./contexts/ThemeContext.tsx";
import { CssBaseline } from "@mui/material";
import Layout from "./layouts/Layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CustomThemeProvider>
          <CssBaseline>
            <Layout>
              <App />
            </Layout>
          </CssBaseline>
        </CustomThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
