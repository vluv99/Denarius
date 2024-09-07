import { Box, Button } from "@mui/material";
import React from "react";
import { CustomTextField } from "../../components/formComponents/CustomTextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginUser } from "../../services/userService";
import { getFormSubmissionInfo } from "react-router-dom/dist/dom";
import { useTranslation } from "react-i18next";

// list inputs in form
type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    await loginUser("EmailAndPass", data.email, data.password).catch(
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        window.alert(
          `${t("view.auth.login.errorMsg")}: ${errorCode}\n${errorMessage}`,
        );
      },
    );
  };

  const onGoogleSubmit: any = async (event: Event) => {
    event.preventDefault();
    await loginUser("Google", "", "").catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      window.alert(
        `${t("view.auth.login.errorMsg")}: ${errorCode}\n${errorMessage}`,
      );
    });
  };

  const rules = {
    required: {
      value: true,
      message: t("view.auth.login.requiredFieldMsg"),
    },
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Controller
        name="email"
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CustomTextField
            id="email-textField"
            label={t("view.auth.login.fields.emailLabel")}
            type="email"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            fullWidth={false}
            sx={{ marginBottom: "4%" }}
            autoComplete={"email"}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CustomTextField
            id="password-textField"
            label={t("view.auth.login.fields.passwordLabel")}
            type="password"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            fullWidth={true}
            sx={{ marginBottom: "4%" }}
            autoComplete={"current-password"}
          />
        )}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          id="EmailAndPass"
          variant="contained"
          type="submit"
          sx={{ flexGrow: "1", maxWidth: "45%" }}
        >
          {t("view.auth.login.loginButtonLabel")}
        </Button>
        <Button
          id="Google"
          variant="contained"
          color="secondary"
          type="button"
          onClick={onGoogleSubmit}
          sx={{ flexGrow: "1", maxWidth: "45%" }}
          disabled={true}
        >
          {t("view.auth.login.googleButtonLabel")}
        </Button>
      </Box>
    </Box>
  );
};
