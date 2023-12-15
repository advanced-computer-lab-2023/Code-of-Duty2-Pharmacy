import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gradient?: string;
    complexGradient?: string;
  }
  interface PaletteOptions {
    gradient?: string;
    complexGradient?: string;
  }
}

const lightTheme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF"
    },
    primary: {
      main: "#064C5B"
    },
    secondary: {
      main: "#064C5B"
    },
    gradient: "linear-gradient(to bottom, #064C5B, #16758a)",
    complexGradient: "linear-gradient(95deg, #064C5B 30%, #16758a 60%, #1a8ba1 90%)"
  }
});

export default lightTheme;
