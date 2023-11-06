import { useContext } from "react";
import { WebSocketChatContext } from "../Contexts/WebSocketChat";

const useWebSocketChat = () => {
  const context = useContext(WebSocketChatContext);
  if (!context) {
    throw new Error(
      "useWebSocketChat must be used within a WebSocketChatContext provider"
    );
  }

  return context;
};

export default useWebSocketChat;
