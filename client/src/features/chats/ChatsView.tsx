import { Inbox } from "@talkjs/react";
import { Backdrop, Box, CircularProgress, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useContext, useEffect, useRef, useState } from "react";
import Talk from "talkjs";
import UserRole from "../../types/enums/UserRole";
import axios from "axios";
import { useQuery } from "react-query";
import config from "../../config/config";
import ChattingWindow from "../../types/ChattingWindow";
import { UserContext } from "../../contexts/UserContext";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useFirstPath from "../../hooks/useFirstPath";
declare let window: ChattingWindow;

const getOtherUserData = async ({ id, role }: { id: string | null; role: UserRole | null }) => {
  if (!id) return null;
  // console.log("=-=-=-=-=-=-=-=-=-=-=-=-Role: ", UserRole[role!]);
  const receiver = role === UserRole.DOCTOR ? "doctors" : role === UserRole.PATIENT ? "patients" : "pharmacists";
  const response = await axios.get(`${config.API_URL}/${receiver}/${id}`);

  return response.data;
};

const ChatsView = () => {
  const currUsertype = useFirstPath();
  const id = useQueryParams().get("id")!;
  const queryRole = useQueryParams().get("role")!;
  const role: UserRole | null =
    queryRole === "doctor"
      ? UserRole.DOCTOR
      : queryRole === "patient"
        ? UserRole.PATIENT
        : queryRole === "pharmacist"
          ? UserRole.PHARMACIST
          : null;
  const otherUserDataQuery = useQuery(["otherUserData", id, role], () => getOtherUserData({ id, role: role }));
  // console.log("=-=-=-=-=-=-=-=-=-=-=-=-Name: ", otherUserDataQuery.data?.name);

  const navigate = useNavigate();
  const currentUser = useContext(UserContext).user!;
  const [conversationId, setConversationId] = useState<string | null>(null);
  const container = useRef<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const mytheme = useTheme();
  const isScreenSmall = useMediaQuery(mytheme.breakpoints.down("md"));

  // attach the function to the resize event
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

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
        // console.log("conversationId: ", conversationId);
        const conversation = window.talkSession!.getOrCreateConversation(conversationId);

        conversation.setParticipant(me);
        conversation.setParticipant(other);
        // const chatbox = window.talkSession.createInbox({
        //   selected: conversation,
        //   useBrowserHistory: true,
        //   showFeedHeader: true,
        //   showChatHeader: true
        // });
        const chatbox = window.talkSession.createChatbox();
        chatbox.select(conversation);
        chatbox.mount(container.current);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, [otherUserDataQuery.data, conversationId, queryRole]);

  return (
    <>
      {isLoading && (
        <>
          <br /> <br />
          <br />
          <h1>Loading...</h1>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw", // Change this line
          height: "90vh", // Change this line
          position: "absolute",
          top: "50%",
          left: "60%",
          transform: "translate(-50%, -47%)",
          zIndex: 0
        }}
      >
        {(windowWidth > 600 || !isScreenSmall) && (
          <div
            style={{
              display: "block",
              marginTop: "-30.5rem",
              paddingRight: "0.5rem",
              paddingBottom: "1.0rem",
              paddingLeft: isScreenSmall ? "0.0rem" : "9.5rem",
              marginLeft: isScreenSmall ? "-3.0rem" : "0.0rem"
            }}
          >
            <IconButton aria-label="delete" size="large" onClick={() => navigate(`/${currUsertype}/chats`)}>
              <ArrowBack fontSize="inherit" /> back to chats
            </IconButton>
          </div>
        )}
        <div
          className="chatbox-container"
          ref={container}
          style={{ width: "100%", height: "70%" }} // Modify this line
        >
          <div id="talkjs-container">
            <i>{isLoading && "Loading Chat..."}</i>
          </div>
        </div>
      </Box>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ChatsView;
