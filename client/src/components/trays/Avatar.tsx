import { FormControlLabel, IconButton, Menu, MenuItem, Switch } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Brightness4, Brightness7, Logout as LogoutIcon } from "@mui/icons-material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import { welcomeRoute } from "../../data/routes/guestRoutes";
import { changePatientPasswordsRoute } from "../../data/routes/patientRoutes";
import { changePharmacistPasswordsRoute } from "../../data/routes/pharmacistRoutes";
import { changeAdminPasswordsRoute } from "../../data/routes/adminRoutes";
import UserRole from "../../types/enums/UserRole";

const Avatar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate(welcomeRoute.path);
    handleClose();
  };

  const { authState } = useContext(AuthContext);
  var changePasswordPath = "";
  if (authState.role === UserRole.PATIENT) {
    changePasswordPath = changePatientPasswordsRoute.path;
  } else if (authState.role === UserRole.ADMIN) {
    changePasswordPath = changeAdminPasswordsRoute.path;
  } else if (authState.role === UserRole.PHARMACIST) {
    changePasswordPath = changePharmacistPasswordsRoute.path;
  }

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
        sx={{ padding: "0" }}
      >
        <AccountCircle />
      </IconButton>
      <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* <MenuItem>
          <FormControlLabel
            control={
              <Switch checked={theme === "dark"} onChange={toggleTheme} />
            }
            label={theme === "dark" ? <Brightness4 /> : <Brightness7 />}
          />
        </MenuItem> */}

        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>

        {/* change password the menu item */}
        <MenuItem
          onClick={() => {
            navigate(changePasswordPath);
            handleClose();
          }}
        >
          <LockResetIcon />
          Change Password
        </MenuItem>
      </Menu>
    </>
  );
};

export default Avatar;
