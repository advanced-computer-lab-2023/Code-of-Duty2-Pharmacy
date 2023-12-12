import Box from "@mui/material/Box";
import ChatPerson from "./ChatPerson";

interface Props {}
const ChatList: React.FC<Props> = () => {
  return (
    <div>
      <Box
        sx={{
          m: 2,
          display: "flex",
          justifyContent: "flex-start",
          gap: 3,
          padding: "2.0rem",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        <ChatPerson />
      </Box>
    </div>
  );
};

export default ChatList;
