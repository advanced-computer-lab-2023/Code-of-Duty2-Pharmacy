import { createTheme } from '@mui/material/styles';
import { grey, lightBlue, purple, teal, green, deepPurple, indigo, cyan, pink } from '@mui/material/colors';

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
      light: pink[100],
      main: purple[300],
      dark: pink[900],
      contrastText: '#ffffff',
    },
    secondary: {
      light: deepPurple[100],
      main: deepPurple[500],
      dark: deepPurple[900],
      contrastText: '#ffffff',
    },
  },
});

export default darkTheme;
