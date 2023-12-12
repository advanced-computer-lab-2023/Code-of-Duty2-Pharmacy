import Box from "@mui/material/Box";
import ChatPerson from "./ChatPerson";

interface Props {}
const ChatList: React.FC<Props> = () => {
  return (
    <div>
      <Box
        sx={{
          m: 2,

          gap: 3,
          padding: "2.0rem",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        <ChatPerson
          name="AbdelRahman Saleh"
          lastmessage="Hello Dr Ahmed, I have a question about the dosage of the medicine I will take."
          time="12:54 PM"
          unread={2}
        />

        <br />
        <ChatPerson
          name="Mohamed Salah"
          lastmessage="Hello there, I have a question about the active ingredient in the medicine I am taking."
          time="09:54 AM"
          unread={10}
        />

        <br />
        <ChatPerson name="Ahmed Mohamed" lastmessage="Hello Dr!." time="10:35 PM" unread={1} />
      </Box>
    </div>
  );
};

export default ChatList;
