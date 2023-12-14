import React from "react";
import ChatsView from "../../features/chats/ChatsView";

const ViewChat: React.FC = () => {
  return (
    <div>
      <h1>View Chat</h1>
      <div style={{ height: "50vh" }}>
        <ChatsView />
      </div>
    </div>
  );
};

export default ViewChat;
