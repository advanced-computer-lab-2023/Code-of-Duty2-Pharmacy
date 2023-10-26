import { useState } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // This is where you would normally fetch the number of notifications
    // For this example, we'll just increment the existing count
    setNotifications(notifications + 1);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Replace 'Notification 1', 'Notification 2', etc. with your actual notifications */}
        <MenuItem>Notification 1</MenuItem>
        <MenuItem>Notification 2</MenuItem>
        <MenuItem>Notification 3</MenuItem>
      </Menu>
    </div>
  );
};

export default Notifications;
