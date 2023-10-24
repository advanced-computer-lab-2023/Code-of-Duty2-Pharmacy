import React from "react";
import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7, AccountCircle } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

import el7a2niLogo from "../assets/el7a2ni_logo.png";

interface NavbarProps {
  darkMode: boolean;
  handleThemeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, handleThemeChange }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link component={RouterLink} to="/">
          <img
            src={el7a2niLogo}
            alt="Logo"
            style={{ height: "2rem", paddingRight: "1rem" }}
          />
        </Link>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          El7a2ni Pharmacy
        </Typography>
        <Box style={{ marginLeft: "auto" }}>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={handleThemeChange} />}
            label={darkMode ? <Brightness4 /> : <Brightness7 />}
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
