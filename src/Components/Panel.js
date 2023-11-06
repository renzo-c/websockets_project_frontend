import React, { useEffect, useState } from "react";
import useWebSocketChat from "../Hooks/useWebSocketChat";
import { typesDef } from "../utils/constants";
import { Button, Card, CardContent, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";

const TextInput = ({ sendJsonMessage, username }) => {
  const [message, setMessage] = useState("");

  const onSendMessage = () => {
    sendJsonMessage({
      type: typesDef.MESSAGE_SENT,
      username,
      message,
    });
    setMessage("");
    // const res = await postMessages({ username, message });
  };
  return (
    <div style={{position: "absolute", bottom: 20}}>
      <TextField
        size="small"
        required
        id="outlined-required"
        value={message}
        placeholder="Type a message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        onClick={onSendMessage}
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ml: 1}}
      >
        Send
      </Button>
    </div>
  );
};

const Panel = ({ initialMessages }) => {
  const [messages, setMessages] = useState([]);
  const { sendJsonMessage, readyState, lastJsonMessage, username } =
    useWebSocketChat();

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    lastJsonMessage && getNewMessageFromSocket();
  }, [lastJsonMessage]);

  const getNewMessageFromSocket = () => {
    switch (lastJsonMessage.type) {
      case typesDef.MESSAGE_SENT: {
        const newMessage = lastJsonMessage.data;
        setMessages([...messages, newMessage]);
        break;
      }
      case typesDef.MESSAGE_DELETE: {
        setMessages(lastJsonMessage.data);
        break;
      }
    }
  };

  const onDeleteMessage = (messageId) => {
    sendJsonMessage({
      type: typesDef.MESSAGE_DELETE,
      messageId,
    });
  };

  const renderCardContent = (m) => {
    const formattedDate = new Date(m.createdAt).toString().substring(0, 22);
    const isCloseEnable = m.username === username;
    return (
      <>
        <Typography variant="body2">{m.message}</Typography>
        <Typography variant="caption" sx={{ mb: 1.5 }} color="text.secondary">
          {`${m.username} - ${formattedDate}`}
        </Typography>
        {isCloseEnable && (
          <IconButton
            onClick={() => onDeleteMessage(m.messageId)}
            aria-label="delete"
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <CancelIcon />
          </IconButton>
        )}
      </>
    );
  };

  return (
    <Paper style={{position: "absolute", bottom: 5, left:5, right: 5, top: 60, backgroundColor: "#f8f8f8", padding: "5px"}}>
      <Typography variant="h4">Panel</Typography>
      <Grid container spacing={2}>
        {messages.map((m) => (
          <Grid item xs={3} key={m.createdAt}>
            <Card>
              <CardContent sx={{ position: "relative" }}>
                {renderCardContent(m)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <TextInput sendJsonMessage={sendJsonMessage} username={username} />
    </Paper>
  );
};

export default Panel;
