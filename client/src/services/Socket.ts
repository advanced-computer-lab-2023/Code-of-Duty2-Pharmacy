// socket.js
import { io } from "socket.io-client";
import config from "../config/config";

const socket = io(config.SOCKET_SERVER_URI);

export function establishSocketConnection(token: string, userId: string) {
  console.log("token", token);
  if (!token) return;

  console.log(token, userId);

  socket.auth = { token, userId };

  console.log("socket.auth", socket.auth);
  socket.connect();
}

export default socket;
