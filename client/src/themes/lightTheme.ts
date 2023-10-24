import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

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
      main: '#064C5B',
    },
    secondary: {
      main: '#064C5B',
    }
  },
});

export default lightTheme;
