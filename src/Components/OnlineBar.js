import React, { useEffect, useState } from "react";
import useWebSocketChat from "../Hooks/useWebSocketChat";
import { Avatar, Box, Paper, Stack } from "@mui/material";

const isUserEvent = (event) => {
  return event === "userConnect" || event === "userDisconnect";
};

const OnlineBar = () => {
  const [users, setUsers] = useState([]);
  const { sendJsonMessage, readyState, lastJsonMessage, username } =
    useWebSocketChat();

  useEffect(() => {
    sendJsonMessage({
      username,
      type: "userConnect",
    });
  }, []);

  useEffect(() => {
    lastJsonMessage && getUsersFromSocket(lastJsonMessage);
  }, [lastJsonMessage]);

  const getUsersFromSocket = (lastJsonMessage) => {
    if (isUserEvent(lastJsonMessage.type)) {
      const newUsers = Object.values(lastJsonMessage.data.clients);
      setUsers(newUsers);
    }
  };

  if (users.length) {
    return (
      <Box sx={{ display: "flex" }}>
        {users.map((user) => (
          <Avatar sx={{ mx: 1 }}>{user.username.substring(0, 3)}</Avatar>
        ))}
      </Box>
    );
  }
  return <Box />;
};
export default OnlineBar;
