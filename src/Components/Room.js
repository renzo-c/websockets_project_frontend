import React, { useEffect, useState } from "react";
import useWebSocketChat from "../Hooks/useWebSocketChat";
import OnlineBar from "./OnlineBar";
import Panel from "./Panel";
import { typesDef } from "../utils/constants";
import { fetchMessages } from "../utils/endpoints";

const Room = () => {
  const { sendJsonMessage, readyState, lastJsonMessage, username } =
    useWebSocketChat();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    sendJsonMessage({
      username,
      type: "userConnect",
    });
  }, []);

  useEffect(() => {
    lastJsonMessage && provisionResources();
  }, [lastJsonMessage]);

  const provisionResources = async () => {
    switch (lastJsonMessage.type) {
      case typesDef.USER_CONNECT: {
        const newUsers = Object.values(lastJsonMessage.data.clients);
        const messageData = await fetchMessages();
        setUsers(newUsers);
        setMessages(messageData);
        break;
      }
      case typesDef.USER_DISCONNECT: {
        const newUsers = Object.values(lastJsonMessage.data.clients);
        setUsers(newUsers);
        break;
      }
    }
  };

  return (
    <>
      <OnlineBar users={users} />
      <Panel initialMessages={messages} />
    </>
  );
};

export default Room;
