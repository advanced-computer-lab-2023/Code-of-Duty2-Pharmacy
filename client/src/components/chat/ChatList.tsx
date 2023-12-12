import ChatPerson from "./ChatPerson";

interface Props {}
const ChatList: React.FC<Props> = () => {
  return (
    <div>
      Chat List
      <ChatPerson />
    </div>
  );
};

export default ChatList;
