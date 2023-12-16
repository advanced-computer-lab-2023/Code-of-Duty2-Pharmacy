import { User } from "../types/User";
import SocketType from "../types/SocketType";

const userIdToSocketIdMap: Map<string, string> = new Map();

export const getSocketIdForUserId = (userId: string) => {
  return userIdToSocketIdMap.get(userId)!;
};

const socketEventListeners = (socket: SocketType) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    return;
  }
  userIdToSocketIdMap.set(userId, socket.id);

  socket.on("disconnect", () => {
    userIdToSocketIdMap.delete(userId);
  });

  socket.on("error", (err) => {
    console.log(`Error occurred on socket ${socket.id}: ${err}`);
  });
  socket.on("outOfStock", (notification) => {
    console.log("out of stock");
  });
};

export default socketEventListeners;
