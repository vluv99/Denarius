import { Box, Button, Container, Typography } from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import { Login } from "./Login";
import { Register } from "./Register";
import React, { useState } from "react";

export const AuthPage = () => {
  const defaultState = authForms.login;

  const [showLoginForms, setShowLoginForms] = useState(
    defaultState == authForms.login,
  );
  const [label, setLabel] = useState(defaultState.title);
  const [navButtonLabel, setNavButtonLabel] = useState(
    defaultState.toOtherFormButtonLabel,
  );
  const [subText, setSubText] = useState(defaultState.subText);

  function handleChangeAuthForms() {
    const newState = !showLoginForms;

    let pageType;
    if (newState) {
      pageType = authForms.login;
    } else {
      pageType = authForms.register;
    }
    setLabel(pageType.title);
    setNavButtonLabel(pageType.toOtherFormButtonLabel);
    setSubText(pageType.subText);

    // set state setter at the end, because it doesn't change state immediately
    setShowLoginForms(newState);
  }

  return (
    <Container sx={{ margin: "5% 0" }}>
      <Box sx={{ flexGrow: 1 }}>
        <PaperCard label={label}>
          <Box
            sx={{ display: "flex", flexDirection: "column", maxWidth: "30%" }}
          >
            {showLoginForms ? <Login /> : <Register />}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "4%",
              }}
            >
              <Typography gutterBottom variant="body1" component="div" mt={0.6}>
                {subText}
              </Typography>
              <Button variant="text" onClick={handleChangeAuthForms}>
                {navButtonLabel}
              </Button>
            </Box>
          </Box>
        </PaperCard>
      </Box>
    </Container>
  );
};

const authForms = {
  login: {
    title: "Sign In",
    toOtherFormButtonLabel: "Register",
    subText: "Don't have an account?",
  },
  register: {
    title: "Create Account",
    toOtherFormButtonLabel: "Login",
    subText: "Already have registered?",
  },
};
