import {
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import UserRole from "../../types/enums/UserRole";

const Avatar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleClose();
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
        {/* TODO: Remove this (used for testing only) */}
        <MenuItem>{authState.role === UserRole.GUEST && "Guest"}</MenuItem>

        <MenuItem>
          <FormControlLabel
            control={
              <Switch checked={theme === "dark"} onChange={toggleTheme} />
            }
            label={theme === "dark" ? <Brightness4 /> : <Brightness7 />}
          />
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Avatar;
