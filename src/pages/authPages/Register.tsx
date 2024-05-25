import {
  Alert,
  Box,
  Button,
  FormControl,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setSnackbarOpen(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        window.alert(
          `Error during user creation: ${errorCode}\n${errorMessage}`,
        );
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successful registration!
        </Alert>
      </Snackbar>
    </Box>
  );
};
