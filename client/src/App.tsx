import { useEffect } from "react";
import socket from "./services/Socket";
import AppRoutes from "./AppRoutes";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import NotificationContextProvider from "./contexts/NotificationContext";
import UserContextProvider from "./contexts/UserContext";
import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3
    }
  }
});

const App = () => {
  useEffect(() => {
    socket.on("error", ({ message }) => {
      console.log(message);
    });
    socket.on("message", (message) => {
      console.log(message);
    });

    socket.emit("message", "hello");
    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, []);
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationContextProvider>
            <AppRoutes />
          </NotificationContextProvider>
        </AuthProvider>
      </QueryClientProvider>
    </UserContextProvider>
  );
};

export default App;
