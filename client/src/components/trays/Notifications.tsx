import { useState, useEffect, useContext } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationContext } from "../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import useFirstPath from "../../hooks/useFirstPath";

const Notifications = () => {
  // TODO: Add another state for actual notifications
  const [numberOfNotifications, setNumberOfNotifications] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { notifications } = useContext(NotificationContext);
  const navigate = useNavigate();
  const usertype = useFirstPath();

  useEffect(() => {
    fetchNotificationsNumber()
      .then((notifications) => {
        setNumberOfNotifications(notifications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [notifications]);

  async function fetchNotificationsNumber() {
    // TODO: Fetch notifications from database here
    // For now, we'll just return a placeholder value
    let count = 0;
    if (!notifications) return Promise.resolve(count);

    for (let notification of notifications) {
      console.log("notification: ", notification);
      if (!notification.isRead) {
        count++;
      }
    }
    console.log("count: ", count);
    return Promise.resolve(count);
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton color="inherit" onClick={handleClick} sx={{ padding: "0" }}>
        <Badge badgeContent={numberOfNotifications} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {/* TODO: Replace with actual notifications
        <MenuItem>Notification 1</MenuItem>
        <MenuItem>Notification 2</MenuItem>
        <MenuItem>Notification 3</MenuItem> */}
        {notifications?.length === 0 && <MenuItem id="non">No notifications</MenuItem>}
        {notifications &&
          notifications.map((notification) => (
            <MenuItem
              key={notification._id}
              onClick={() => {
                navigate(`/${usertype}/notification/view?id=${notification._id}`);
              }}
              id={notification._id}
            >
              {(!notification.isRead && <strong>{notification.subject}</strong>) ||
                (notification.isRead && notification.subject)}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default Notifications;
