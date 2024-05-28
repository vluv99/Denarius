import { Box, Button, Container, Typography } from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import { Login } from "./Login";
import { Register } from "./Register";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";

export const AuthPage = () => {
  const defaultState = authForms.login;

  const [showLoginForms, setShowLoginForms] = useState(
    defaultState == authForms.login,
  );
  const [label, setLabel] = useState(defaultState.title);
  const [navButtonLabel, setNavButtonLabel] = useState(
    defaultState.toOtherFormButtonLabel,
  );
  //const [navButtonColor, setNavButtonColor] = useState(defaultState.color);
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
    //setNavButtonColor(pageType.color); // color prop isn't able to handle variable, only direct string, why??

    // set state setter at the end, because it doesn't change state immediately
    setShowLoginForms(newState); //TODO: Question: why is the state thing only set after the function? Possibly?
  }

  return (
    <Container sx={{ margin: "5% 0" }}>
      <Box sx={{ flexGrow: 1 }}>
        <PaperCard label={label}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: isMobile ? "100%" : "30%",
            }}
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
              <Button
                variant="text"
                onClick={handleChangeAuthForms}
                color={"secondary"} //TODO: Question: Why can't you add a variable for this item?
              >
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
    color: "secondary",
  },
  register: {
    title: "Create Account",
    toOtherFormButtonLabel: "Login",
    subText: "Already have registered?",
    color: "primary",
  },
};
