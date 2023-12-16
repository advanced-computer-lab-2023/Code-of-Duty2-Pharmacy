import React, { useEffect, useState } from "react";
import NotificationViewElement from "../../components/notification/NotificationViewElement";
import axios from "axios";
import config from "../../config/config";
import useFirstPath from "../../hooks/useFirstPath";
import { Notification } from "../../types";

const NotificationView: React.FC = () => {
  const [notification, setNotification] = useState<Notification>();
  const usertype = useFirstPath();

  const params = new URLSearchParams(window.location.search);
  const notificationId = params.get("id") as string | "";
  useEffect(() => {
    getNotificationAndMarkAsRead();
  }, [notificationId]);

  const getNotificationAndMarkAsRead = async () => {
    const response = await axios.patch(`${config.API_URL}/${usertype + "s"}/notifications/get-markread-notification`, {
      notificationId: notificationId
    });
    const notification = response.data;
    setNotification(notification);
  };

  return (
    <>
      {notification && (
        <NotificationViewElement
          notification={notification}
          medId={
            notification.description.includes(", id = ") && usertype === "pharmacist"
              ? notification.description.split(", id = ")[1]
              : undefined
          }
        />
      )}
      {!notification && <h1>Nothing To see Here :)</h1>}
    </>
  );
};

export default NotificationView;
