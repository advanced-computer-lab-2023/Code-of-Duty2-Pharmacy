import { createContext, useContext, useEffect, useState } from "react";
import { Notification } from "../types";
import socket from "../services/Socket";
import axios from "axios";
import UserRole from "../types/enums/UserRole";
import { AuthContext } from "./AuthContext";
import config from "../config/config";

type NotificationContextType = {
  notifications: Notification[] | null;
  setNotifications: React.Dispatch<Notification[] | null>;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
};
export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  setNotifications: () => {},
  addNotification: () => {},
  removeNotification: () => {}
});

const getAllNotifications = async (role: UserRole): Promise<Notification[]> => {
  // console.log(role);
  const userRolePath =
    role === UserRole.DOCTOR
      ? "doctors"
      : role === UserRole.PATIENT
        ? "patients"
        : role === UserRole.ADMIN
          ? "admins"
          : "pharmacists";
  const response = await axios.get(`${config.API_URL}/${userRolePath}/notifications`);
  // console.log("fetched====", response.data);
  return response.data;
};

type ProviderProps = {
  children: React.ReactNode;
};
const NotificationContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[] | null>(null);

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (authState.role) {
      console.log("getting notifications");
      getAllNotifications(authState.role).then((data) => {
        setNotifications(data.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()));
      });
    }
  }, [authState.role]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => {
      if (prev) {
        return [...prev, notification];
      }
      return [notification];
    });
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => {
      if (prev) {
        return prev.filter((notification) => notification._id !== id);
      }
      return null;
    });
  };

  useEffect(() => {
    const handleNotification = (notification: Notification) => {
      addNotification(notification);
      console.log("new notification: ", notification);
    };
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
