import { useContext } from "react";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, FormControlLabel, IconButton, Switch } from "@mui/material";
import { ThemeContext } from "../contexts/ThemeContext";

const UserTray = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Box>
      <FormControlLabel
        control={<Switch checked={theme === "dark"} onChange={toggleTheme} />}
        label={theme === "dark" ? <Brightness4 /> : <Brightness7 />}
      />
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </Box>
  );
};

export default UserTray;
