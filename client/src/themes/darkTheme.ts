import { createTheme } from '@mui/material/styles';
import { grey, blue } from '@mui/material/colors';

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
      default: grey[900],
      paper: grey[900],
    },
    primary: {
      light: blue[100],
      main: blue[800],
      dark: blue[900],
      contrastText: '#ffffff',
    },
    secondary: {
      light: blue[100],
      main: blue[800],
      dark: blue[900],
      contrastText: '#ffffff',
    },
  },
});

export default darkTheme;
