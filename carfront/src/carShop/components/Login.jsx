import React, { useState } from "react";
import { SERVER_URL } from "./constants";
import { Button, TextField, Stack, Snackbar } from "@mui/material";
import CarList from "./CarList";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isAuthenticated, setAuth] = useState(
    sessionStorage.getItem("jwt") !== null ? true : false
  );
  const [open ,setOpen] = useState(false);

  const handleChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  const login = () => {
    fetch(SERVER_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        const jwtToken = response.headers.get("Authorization");
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        } else {
          setOpen(true);
        }
      })
      .catch((e) => console.error(e));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  const notAuth = () => setAuth(false);

  if (isAuthenticated) {
    return <CarList notAuth={notAuth} />;
  } else {
    return (
      <div>
        <Stack spacing={2} alignItems="center" mt={2}>
          <TextField name="username" label="Username" onChange={handleChange} />
          <TextField
            name="password"
            label="Password"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="password"
          />
          <Button variant="outlined" color="primary" onClick={login}>
            Login
          </Button>
        </Stack>

        <Snackbar open={open}
        autoHideDuration={3000}
        onClose={()=>setOpen(false)}
        message="Login Failed: Check your username and password" />


      </div>
    );
  }
};

export default Login;
