import {
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import { registerUser } from "../../services/userService";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await registerUser(username, email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      window.alert(`Error during user creation: ${errorCode}\n${errorMessage}`);
    });
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <TextField
        id="email-textField"
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: "4%" }}
      />
      <TextField
        id="username-textField"
        label="Username"
        variant="outlined"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: "4%" }}
      />
      <TextField
        id="password-textField"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: "8%" }}
      />
      <FormControl sx={{ marginBottom: "4%" }}>
        <Button
          variant="contained"
          color="secondary"
          // startIcon={<Input />}
          type="submit"
          sx={{ flexGrow: "1" }}
        >
          Register
        </Button>
      </FormControl>
    </Box>
  );
};
