import { Box, Button } from "@mui/material";
import React from "react";
import { CustomTextField } from "../../components/formComponents/CustomTextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginUser } from "../../services/userService";

// list inputs in form
type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await loginUser(data.email, data.password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      window.alert(`Error during user login: ${errorCode}\n${errorMessage}`);
    });
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
            //id="email-textField"
            label="Email"
            type="email"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            fullWidth={false}
            sx={{ marginBottom: "4%" }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CustomTextField
            //id="password-textField"
            label="Password"
            type="password"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            fullWidth={true}
            sx={{ marginBottom: "4%" }}
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
          variant="contained"
          type="submit"
          sx={{ flexGrow: "1", maxWidth: "45%" }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ flexGrow: "1", maxWidth: "45%" }}
        >
          Google
        </Button>
      </Box>
    </Box>
  );
};
