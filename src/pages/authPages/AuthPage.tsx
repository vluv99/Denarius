import { Box, Button, Container, Typography } from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import { Login } from "./Login";
import { Register } from "./Register";
import React, { ReactElement, useState } from "react";
import { isMobile } from "react-device-detect";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { projectName, websiteName } from "../../theme/consts";
import Divider from "@mui/material/Divider";

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
    <Container maxWidth={"md"} sx={{ margin: "5% auto" }}>
      <Box sx={{ flexGrow: 1 }}>
        <PaperCard label={authForm.title}>
          <Box
            display={"flex"}
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "stretch" : "center",
              flexFlow: isMobile ? "column wrap" : "unset",
              maxWidth: isMobile ? "100%" : "unset",
            }}
          >
            <Box
              component="section"
              display={"flex"}
              sx={{
                flexDirection: "column",
                //flexGrow: 1,
                margin: isMobile ? "5% 0 0 0" : "0",
                width: isMobile ? "100%" : "40%",
                alignSelf: "start",
              }}
            >
              {children}
              <Box
                display={"flex"}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "4%",
                }}
              >
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  mt={0.6}
                >
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
            <Divider
              orientation={isMobile ? "horizontal" : "vertical"}
              flexItem
            />
            <Box
              component="section"
              display={"flex"}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                maxWidth: isMobile ? "100%" : "50%",
                margin: isMobile ? "5% 0" : "0 0",
                //flexGrow: 1,
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 100 }} />
              <Typography gutterBottom variant="h6" component="div">
                {websiteName}
              </Typography>

              <Typography
                gutterBottom
                variant="caption"
                component="i"
                p={"1 0 0 0"}
              >
                of {projectName} Production
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                sx={{ textAlign: "center" }}
              >
                Manage your finances easily and conveniently. Keep track and
                share household expenses within your family.
              </Typography>
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
