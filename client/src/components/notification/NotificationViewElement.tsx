import ArrowBack from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFirstPath from "../../hooks/useFirstPath";
import { Notification } from "../../types";
import axios from "axios";
import config from "../../config/config";

interface Props {
  notification: Notification;
  additionalObject?: any;
}
const NotificationViewElement: React.FC<Props> = ({ notification, additionalObject = undefined }) => {
  const navigate = useNavigate();
  const usertype = useFirstPath();

  //   useEffect(() => { }, [notification]);

  return (
    <div style={{ padding: "2.0rem" }}>
      <Button startIcon={<ArrowBack />} variant="text" onClick={() => navigate(`/${usertype}/dashboard`)}>
        Back To Dashboard
      </Button>
      <h1>View Notification</h1>
      <Box
        sx={{
          border: "1px solid #ddd", // Border color
          boxShadow: "0 2px 40px rgba(0, 0, 0, 0.1)", // Box shadow
          padding: "16px", // Adjust padding as needed
          borderRadius: "18px", // Border radius
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr" },
          gap: 2
        }}
      >
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Subject:</strong> {notification.subject}
        </p>
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>ID:</strong> {notification._id}
        </p>
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Date & Time:</strong>{" "}
          {(notification.time &&
            `${new Date(notification.time).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })} ${new Date(notification.time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            })}`) ||
            "N/A"}
        </p>
      </Box>
      <br />
      <Box
        sx={{
          border: "1px solid #ddd", // Border color
          boxShadow: "0 2px 40px rgba(0, 0, 0, 0.1)", // Box shadow
          padding: "16px", // Adjust padding as needed
          borderRadius: "18px", // Border radius
          gap: 2,
          display: "block"
        }}
      >
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Description</strong> {notification.description}
        </p>
      </Box>
      <br />
    </div>
  );
};

export default NotificationViewElement;
