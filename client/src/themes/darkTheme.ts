import { createTheme } from '@mui/material/styles';
import { grey, blue, red } from '@mui/material/colors';

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
      default: '#1f1f1f',
      paper: '#1f1f1f',
    },
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blue[800],
    },
  },
});

export default darkTheme;
