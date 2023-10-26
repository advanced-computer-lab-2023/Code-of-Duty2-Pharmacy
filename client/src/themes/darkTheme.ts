import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradient?: string;
  }
  interface PaletteOptions {
    gradient?: string;
  }
}

const darkTheme = createTheme({
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
    mode: 'dark',
    background: {
      default: '#1B1B1B',
      paper: '#1B1B1B',
    },
    primary: {
      main: '#064C5B',
    },
    secondary: {
      main: '#064C5B',
    },
    gradient: 'linear-gradient(to top, #064C5B, #064C5B)'
  },
});

export default darkTheme;
