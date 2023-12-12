import { Typography } from "@mui/material";
import ChatList from "../../components/chat/ChatList";

const ChatPage = () => {
  return (
    <div>
      <Typography sx={{ paddingLeft: "1.5rem" }} variant="h4">
        Chats
      </Typography>
      <ChatList />
    </div>
  );
};

export default ChatPage;
