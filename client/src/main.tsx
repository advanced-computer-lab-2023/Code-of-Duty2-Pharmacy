import ReactDOM from "react-dom/client";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CustomThemeProvider } from "./contexts/ThemeContext.tsx";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <CustomThemeProvider>
        <CssBaseline>
          <QueryClientProvider client={new QueryClient()}>
            <App />
          </QueryClientProvider>
        </CssBaseline>
      </CustomThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
