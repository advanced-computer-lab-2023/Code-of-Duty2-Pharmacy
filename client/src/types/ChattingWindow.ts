import Talk from "talkjs";

interface ChattingWindow extends Window {
  talkSession?: Talk.Session;
}

export default ChattingWindow;
