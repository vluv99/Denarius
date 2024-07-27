import { Box, Button } from "@mui/material";
import React from "react";
import { loginUser, registerUser } from "../../services/userService";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomTextField } from "../../components/formComponents/CustomTextField";
import { useTranslation } from "react-i18next";

// list inputs in form
type Inputs = {
  email: string;
  username: string;
  password: string;
};

export const Register = () => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await registerUser(data.email, data.username, data.password).catch(
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        window.alert(
          `${t("view.auth.register.errorMsg")}: ${errorCode}\n${errorMessage}`,
        );
      },
    );
  };

  const rules = {
    required: {
      value: true,
      message: t("view.auth.register.requiredFieldMsg"),
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
            label={t("view.auth.register.fields.emailLabel")}
            type="email"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            fullWidth={true}
            sx={{ marginBottom: "4%" }}
            autoComplete={"email"}
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CustomTextField
            id="username-textField"
            label={t("view.auth.register.fields.usernameLabel")}
            type="text"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            fullWidth={true}
            sx={{ marginBottom: "4%" }}
            autoComplete={"username"}
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
            label={t("view.auth.register.fields.passwordLabel")}
            type="password"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            fullWidth={true}
            sx={{ marginBottom: "4%" }}
            autoComplete={"new-password"}
          />
        )}
      />

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        sx={{ flexGrow: "1" }}
      >
        {t("view.auth.register.registerButtonLabel")}
      </Button>
    </Box>
  );
};
