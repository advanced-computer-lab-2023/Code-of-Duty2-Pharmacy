import { createTheme } from '@mui/material/styles';

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
  /* palette: {
    mode: 'dark',
    background: {

    },
    primary: {

    },
    secondary: {

    },
  }, */
});

export default lightTheme;
