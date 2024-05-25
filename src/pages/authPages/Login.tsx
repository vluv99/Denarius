import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import React, { FormEvent, useState } from "react";
import { Input } from "@mui/icons-material";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container sx={{ margin: "5% 0" }}>
      <Box sx={{ flexGrow: 1 }}>
        <PaperCard label="Please Login!">
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ display: "flex", flexDirection: "column", maxWidth: "30%" }}
          >
            <TextField
              id="email-textField"
              label="Email"
              variant="outlined"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password-textField"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <FormControl>
              <Button variant="contained" startIcon={<Input />} type="submit">
                Login
              </Button>
            </FormControl>
          </Box>
        </PaperCard>
      </Box>
    </Container>
  );
};
