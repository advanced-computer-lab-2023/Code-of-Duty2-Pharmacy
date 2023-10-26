import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { ButtonColor } from "../../types";

const AuthTray = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const buttons: { color: ButtonColor; children: string }[] = [
    { color: "inherit", children: "About" },
    { color: "inherit", children: "For Pharmacists" },
    { color: "inherit", children: "Login" },
  ];

  const drawerContent = (
    <Box sx={{ padding: theme.spacing(2) }}>
      <Stack direction="column" spacing={2} alignItems="flex-start">
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
        {buttons.map((buttonProps, index) => (
          <Button
            key={index}
            {...buttonProps}
            sx={{ marginLeft: theme.spacing(2) }}
          />
        ))}
      </Stack>
    </Box>
  );

  const largeScreenContent = (
    <Stack direction="row" spacing={2}>
      {buttons.map((buttonProps, index) => (
        <Button key={index} {...buttonProps} />
      ))}
    </Stack>
  );

  return isMediumScreen ? (
    <>
      <IconButton color="inherit" onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  ) : (
    <Box>{largeScreenContent}</Box>
  );
};

export default AuthTray;
