import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import axios from "axios";
import Panel from "./Panel";
import { WS_URL, typesDef } from "../utils/constants";
import OnlineBar from "./OnlineBar";
import WebSocketChatProvider from "../Contexts/WebSocketChat";
import useWebSocketChat from "../Hooks/useWebSocketChat";
import Room from "./Room";

const Home = ({ username }) => {
  return (
    <WebSocketChatProvider username={username}>
      <Room />
    </WebSocketChatProvider>
  );
};

export default Home;
