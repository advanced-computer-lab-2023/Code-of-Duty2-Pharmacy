import { Inbox } from "@talkjs/react";
import { Box } from "@mui/material";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useContext, useEffect, useRef, useState } from "react";
import Talk from "talkjs";
import UserRole from "../../types/enums/UserRole";
import axios from "axios";
import { useQuery } from "react-query";
import config from "../../config/config";
import ChattingWindow from "../../types/ChattingWindow";
import { UserContext } from "../../contexts/UserContext";
declare let window: ChattingWindow;

const getOtherUserData = async ({ id, role }: { id: string | null; role: UserRole }) => {
  if (!id) return null;
  const receiver = role === UserRole.DOCTOR ? "doctors" : role === UserRole.PATIENT ? "patients" : "pharmacists";
  const response = await axios.get(`${config.API_URL}/${receiver}/${id}`);

  return response.data;
};

const ChatsView = () => {
  const id = useQueryParams().get("id")!;
  const queryRole = useQueryParams().get("role")!;
  const role =
    queryRole === "doctor" ? UserRole.DOCTOR : queryRole === "patient" ? UserRole.PATIENT : UserRole.PHARMACIST;

  const otherUserDataQuery = useQuery(["otherUserData", id, role], () => getOtherUserData({ id, role }));

  const currentUser = useContext(UserContext).user!;
  const [conversationId, setConversationId] = useState<string | null>(null);
  const container = useRef<any>();

  useEffect(() => {
    Talk.ready
      .then(() => {
        const me = new Talk.User(currentUser);

        const otherData = {
          id,
          name: (otherUserDataQuery.data?.name as string) || "Unknown",
          email: (otherUserDataQuery.data?.email as string) || "Unknown",
          photoUrl: otherUserDataQuery.data?.imageUrl,
          role: queryRole
        };

        const other = new Talk.User(otherData!);

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: config.TALKJS_APP_ID,
            me: me
          });
        }

        const conversationId = Talk.oneOnOneId(me, other);
        console.log("conversationId: ", conversationId);
        const conversation = window.talkSession!.getOrCreateConversation(conversationId);

        conversation.setParticipant(me);
        conversation.setParticipant(other);
        const chatbox = window.talkSession.createInbox({
          selected: conversation,
          useBrowserHistory: true,
          showFeedHeader: true,
          showChatHeader: true
        });
        chatbox.mount(container.current);
      })
      .catch((e) => console.error(e));
  }, [otherUserDataQuery.data, conversationId]);

  return (
    <div className="chatbox-container" ref={container} style={{ width: "100%", height: "100%" }}>
      <div id="talkjs-container">
        <i></i>
      </div>
    </div>
  );
};

export default ChatsView;
