import {
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";

const Avatar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
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
    </>
  );
};

export default Avatar;
