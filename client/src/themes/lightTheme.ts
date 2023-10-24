import { createTheme } from '@mui/material/styles';
import { grey, blue } from '@mui/material/colors';

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
      default: grey[50],
      paper: grey[50],
    },
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blue[800],
    }
  },
});

export default lightTheme;
