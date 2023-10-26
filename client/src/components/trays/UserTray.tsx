import { useContext, useState } from "react";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Menu,
  MenuItem,
} from "@mui/material";

import { ThemeContext } from "../../contexts/ThemeContext";

const UserTray = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Switch checked={theme === "dark"} onChange={toggleTheme} />
            }
            label={theme === "dark" ? <Brightness4 /> : <Brightness7 />}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserTray;
