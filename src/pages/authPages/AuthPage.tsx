import { Box, Button, Container, Typography } from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import { Login } from "./Login";
import { Register } from "./Register";
import React, { ReactElement, useState } from "react";
import { isMobile } from "react-device-detect";

export const AuthPage = () => {
  const defaultState = authForms.login;

  const [authForm, setAuthForm] = useState(defaultState);

  const [showLoginForms, setShowLoginForms] = useState(
    defaultState == authForms.login,
  );

  function handleChangeAuthForms() {
    const newState = !showLoginForms;

    if (newState) {
      setAuthForm(authForms.login);
    } else {
      setAuthForm(authForms.register);
    }
    // set state setter at the end, because it doesn't change state immediately
    setShowLoginForms(newState);
  }

  return (
    <AuthPageLayout
      authForm={authForm}
      handleNavigation={handleChangeAuthForms}
    >
      {showLoginForms ? <Login /> : <Register />}
    </AuthPageLayout>
  );
};

export const AuthPageLayout = ({
  authForm,
  children,
  handleNavigation,
}: {
  authForm: AuthForm;
  children: ReactElement;
  handleNavigation: () => void;
}) => {
  return (
    <Container sx={{ margin: "5% 0" }}>
      <Box sx={{ flexGrow: 1 }}>
        <PaperCard label={authForm.title}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: isMobile ? "100%" : "30%",
            }}
          >
            {children}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "4%",
              }}
            >
              <Typography gutterBottom variant="body1" component="div" mt={0.6}>
                {authForm.subText}
              </Typography>
              <Button
                variant="text"
                onClick={handleNavigation}
                color={authForm.color}
              >
                {authForm.toOtherFormButtonLabel}
              </Button>
            </Box>
          </Box>
        </PaperCard>
      </Box>
    </Container>
  );
};

type AuthForm = {
  title: string;
  toOtherFormButtonLabel: string;
  subText: string;
  color: "primary" | "secondary";
};

type AuthForms = {
  [key: string]: AuthForm;
};

const authForms: AuthForms = {
  login: {
    title: "Sign In",
    toOtherFormButtonLabel: "Register",
    subText: "Don't have an account?",
    color: "secondary",
  },
  register: {
    title: "Create Account",
    toOtherFormButtonLabel: "Login",
    subText: "Already registered?",
    color: "primary",
  },
};
