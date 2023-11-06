import React, { useState } from "react";
import { TextField, Typography, Button, Grid } from "@mui/material";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    onSubmit(username);
  };

  return (
    <Grid
      container
      xs={12}
      spacing={4}
      textAlign="center"
      sx={{ transform: "translateY(50%)" }}
    >
      <Grid item xs={12}>
        <Typography variant="h4">Public Board</Typography>
        <Typography variant="subtitle1">Type your name to access</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          size="small"
          required
          id="outlined-required"
          value={username}
          placeholder="Type a username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          size="large"
          onClick={onLogin}
          disabled={!username.length}
        >
          Access Chat
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
