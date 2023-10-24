import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradient?: string;
  }
  interface PaletteOptions {
    gradient?: string;
  }
}

const lightTheme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      ].join(','),
  },
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#064C5B',
    },
    secondary: {
      main: '#064C5B',
    },
    gradient: 'linear-gradient(to right bottom, #064C5B, #82ffa1)',
  },
});

export default lightTheme;
