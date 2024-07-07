import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import { DatePicker } from "@mui/x-date-pickers";
import {
  AddCircleOutline,
  CreditCard,
  CreditScore,
  CurrencyExchange,
  Healing,
  LocalDining,
  MedicalInformation,
} from "@mui/icons-material";
import {
  useCategoryContext,
  usePaymentMethodContext,
  useUserContext,
} from "../../contexts/DBContexts";
import { User } from "../../models/UserModel";
import { Category } from "../../models/CategoryModel";
import { PaymentMethod } from "../../models/PaymentMethodModel";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { addTransaction } from "../../services/transactionService";
import { CustomTextField } from "../../components/formComponents/CustomTextField";
import { CustomSelect } from "../../components/formComponents/CustomSelect";
import moment from "moment";
import { CustomDatePicker } from "../../components/formComponents/CustomDatePicker";
import { CustomMoneyNumberFiled } from "../../components/formComponents/CustomMoneyNumberField";
import { RegisterOptions } from "react-hook-form/dist/types/validator";
import { CustomChipArray } from "../../components/formComponents/CustomChipArray";
import { isMobile } from "react-device-detect";
import { CustomCheckbox } from "../../components/formComponents/CustomChecbox";

// list inputs in form
type Inputs = {
  payee: string;
  category: Category | "";
  date: Date;
  amount: string;
  description: string;
  user: User;
  paymentMethod: PaymentMethod | null;
  isCommon: boolean;
};

export function AddTransaction() {
  const categories = useCategoryContext();
  const paymentMethods = usePaymentMethodContext();
  const currentUser = useUserContext();
  const users: User[] = [
    currentUser! /*,
    new User("0", "dpeter99@gmail.com", "dpeter99"),*/,
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      payee: "",
      category: "",
      date: new Date(),
      amount: "",
      description: "",
      user: currentUser,
      paymentMethod:
        paymentMethods.find((p) => p.name === "Main Debit Card") || null,
      isCommon: false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //console.log(data);
    await addTransaction(data, currentUser!).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      window.alert(
        `Error during adding transaction: ${errorCode}\n${errorMessage}`,
      );
    });
  };

  const rules = {
    required: {
      value: true,
      message: "The field is required",
    },
  };

  const amountRules: Omit<
    RegisterOptions<Inputs, "amount">,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  > = {
    required: {
      value: true,
      message: "The field is required",
    },
    pattern: {
      value: /^-?[0-9]\d*(\.\d+)?$/,
      message: "Amount must be a valid number",
    },
    validate: {
      expenseCategory: (v: string, formValues) => {
        // if return is string or false it's error, if true it's valid

        const positives = categories
          .filter((c) => c.expenseType === "Income")
          .map((c) => c.name);
        const negatives = categories
          .filter((c) => c.expenseType === "Expense")
          .map((c) => c.name);

        if (
          formValues.category &&
          positives.includes(formValues.category.name) &&
          Number(v) < 0
        ) {
          return "Amount must be Positive";
        } else if (
          formValues.category &&
          negatives.includes(formValues.category.name) &&
          Number(v) > 0
        ) {
          return "Amount must be Negative";
        }
        // if category isn't selected yet, don't throw error
        return true;
      },
    },
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, margin: "3% 0" }}>
        <PaperCard label="Add New Transactions">
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            sx={{
              width: isMobile ? "100%" : "50%",
              minWidth: isMobile ? "95%" : "40vh",
            }}
          >
            <Grid
              container
              spacing={2}
              columns={isMobile ? 1 : 2}
              sx={{ flexGrow: 1 }}
            >
              <Grid item xs={1}>
                <Controller
                  name="payee"
                  control={control}
                  rules={rules}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <CustomTextField
                      label="Payee"
                      type="text"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1}>
                <Controller
                  name="category"
                  control={control}
                  rules={rules}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    const values = categories.map((c) => ({
                      id: c.id,
                      name: c.name,
                    }));
                    return (
                      <CustomSelect
                        id="category"
                        label="Category"
                        value={value ? value.id : ""}
                        onChange={(e) =>
                          onChange(values.find((v) => v.id == e.target.value))
                        }
                        error={!!error}
                        helperText={error?.message}
                        modelsArray={values}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <Controller
                  name="date"
                  control={control}
                  rules={rules}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <CustomDatePicker
                      label="Date"
                      openTo="day"
                      views={["year", "month", "day"]}
                      value={moment(value)}
                      onChange={onChange}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1}>
                <Controller
                  name="amount"
                  control={control}
                  rules={amountRules}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <CustomMoneyNumberFiled
                      id={"amount"}
                      value={value}
                      label={"Amount"}
                      moneySign={"Ft"}
                      autoComplete={"off"}
                      onChange={onChange}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={1}>
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    let passingValues = paymentMethods.map((p) => {
                      let icon = undefined;
                      switch (p.name) {
                        case "Main Debit Card":
                          icon = <CreditCard />;
                          break;
                        case "Egészség":
                          icon = <MedicalInformation />;
                          break;
                        case "Credit Card":
                          icon = <CreditScore />;
                          break;
                        case "SZÉP":
                          icon = <LocalDining />;
                          break;
                        case "Revolut":
                          icon = <CurrencyExchange />;
                          break;
                      }

                      return {
                        chipLabel: p.name,
                        key: p.id,
                        avatar: undefined,
                        icon: icon,
                      };
                    });

                    return (
                      <CustomChipArray
                        id={"paymentMethod"}
                        label="Payment Method"
                        value={value ? value.id : ""}
                        modelsArray={passingValues}
                        onChange={(id) => {
                          //find the user based on the userID
                          const p = paymentMethods.find((p) => p.id === id);
                          onChange(p);
                        }}
                        error={!!error}
                        helperText={error?.message || "Optional"}
                      />
                    );
                  }}
                />
              </Grid>

              <Grid item xs={1}>
                <Controller
                  name="description"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <CustomTextField
                      label="Description"
                      type="text"
                      value={value}
                      onChange={onChange}
                      //error={!!error}
                      helperText={error?.message || "Optional"}
                      multiline={true}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={1}>
                <Controller
                  name="user"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    const passingValues = users.map((u) => ({
                      chipLabel: u.username,
                      key: u.userId,
                      avatar: u.username
                        .replace(/[^a-zA-Z0-9 ]/g, "")
                        .toUpperCase()
                        .substring(0, 2), // TODO: add profilePic to user and check if exists, otherwise return name letters
                      icon: undefined,
                    }));

                    return (
                      <CustomChipArray
                        id={"users"}
                        label="Users"
                        value={value ? value.userId : ""}
                        modelsArray={passingValues}
                        onChange={(userID) => {
                          //find the user based on the userID
                          const user = users.find((u) => u.userId === userID);
                          onChange(user);
                        }}
                        //error={!!error}
                        //helperText={error?.message || "Optional"}
                      />
                    );
                  }}
                />
              </Grid>

              <Grid item xs={1}>
                <Controller
                  name="isCommon"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <CustomCheckbox
                      label="Is common expense?"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={1}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  type="submit"
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {/*  <Box*/}
            {/*    sx={{*/}
            {/*      display: "flex",*/}
            {/*      flexGrow: isMobile ? 1 : 2,*/}
            {/*      minWidth: isMobile ? "25ch" : "50ch",*/}
            {/*      flexDirection: isMobile ? "column" : "initial", //TODO: fix the mobile view for these buttons somehow???*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <FormControl*/}
            {/*      sx={{*/}
            {/*        marginTop: 1,*/}
            {/*        marginBottom: 1,*/}
            {/*        marginRight: isMobile ? 0 : 1,*/}
            {/*        width: "25ch",*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <Button*/}
            {/*        variant="outlined"*/}
            {/*        startIcon={<DeleteIcon />}*/}
            {/*        color="secondary"*/}
            {/*        type="reset"*/}
            {/*        onClick={handleClear}*/}
            {/*      >*/}
            {/*        Clear*/}
            {/*      </Button>*/}
            {/*    </FormControl>*/}
            {/*    <FormControl*/}
            {/*      sx={{*/}
            {/*        marginTop: 1,*/}
            {/*        marginBottom: 1,*/}
            {/*        marginLeft: isMobile ? 0 : 1,*/}
            {/*        width: "25ch",*/}
            {/*      }}*/}
            {/*    >*/}

            {/*    </FormControl>*/}
            {/*  </Box>*/}
          </Box>
        </PaperCard>
      </Box>
    </Container>
  );
}
