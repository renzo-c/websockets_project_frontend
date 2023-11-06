import React, { createContext } from "react";
import useWebSocket from "react-use-websocket";
import { WS_URL } from "../utils/constants";

const WebSocketChatContext = createContext();

const WebSocketChatProvider = ({ children, username }) => {
  const params = { share: true, queryParams: { username } };

  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(
    WS_URL,
    params
  );

  return (
    <WebSocketChatContext.Provider
      value={{ sendJsonMessage, readyState, lastJsonMessage, username }}
    >
      {children}
    </WebSocketChatContext.Provider>
  );
};

export default WebSocketChatProvider;
export { WebSocketChatContext };
