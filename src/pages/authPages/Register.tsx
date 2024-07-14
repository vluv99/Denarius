import { Box, Button } from "@mui/material";
import React from "react";
import { loginUser, registerUser } from "../../services/userService";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomTextField } from "../../components/formComponents/CustomTextField";

// list inputs in form
type Inputs = {
  email: string;
  username: string;
  password: string;
};

export const Register = () => {
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
          `Error during user registration: ${errorCode}\n${errorMessage}`,
        );
      },
    );
  };

  const rules = {
    required: {
      value: true,
      message: "The field is required",
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
            label="Email"
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
            label="Username"
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
            label="Password"
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
        Register
      </Button>
    </Box>
  );
};
