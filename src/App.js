import React, { useState } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";

const App = () => {
  const [username, setUsername] = useState("");

  return username ? (
    <Home username={username} />
  ) : (
    <Login onSubmit={setUsername} />
  );
};

export default App;
