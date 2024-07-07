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
import { AddCircleOutline } from "@mui/icons-material";
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
  const users: User[] = [currentUser!];

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
      paymentMethod: null,
      isCommon: false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    // await addTransaction(
    //   data /*, categories, paymentMethods, currentUser*/,
    // ).catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //
    //   window.alert(
    //     `Error during adding transaction: ${errorCode}\n${errorMessage}`,
    //   );
    // });
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
          >
            <Grid container spacing={2} columns={2} sx={{ flexGrow: 1 }}>
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
                      openTo="month"
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
                      helperText={error?.message}
                      multiline={true}
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

            {/*  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">*/}
            {/*    <InputLabel id="user-label">User</InputLabel>*/}
            {/*    <Select*/}
            {/*      labelId="user-label"*/}
            {/*      id="user-select"*/}
            {/*      value={user}*/}
            {/*      label="User"*/}
            {/*      onChange={handleUserChange}*/}
            {/*    >*/}
            {/*      {users.map((value, i) => (*/}
            {/*        <MenuItem key={"user-select-" + i} value={value.userId}>*/}
            {/*          <AccountCircle />*/}
            {/*          {value.username}*/}
            {/*        </MenuItem>*/}
            {/*      ))}*/}
            {/*    </Select>*/}
            {/*  </FormControl>*/}
            {/*  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">*/}
            {/*    <InputLabel id="card-label">Payment method</InputLabel>*/}
            {/*    <Select*/}
            {/*      labelId="card-label"*/}
            {/*      id="card-select"*/}
            {/*      value={card}*/}
            {/*      label="Card type"*/}
            {/*      onChange={handleCardChange}*/}
            {/*    >*/}
            {/*      {paymentMethods.map((card, index) => (*/}
            {/*        <MenuItem key={"card-select-" + index} value={card.id}>*/}
            {/*          {card.name}*/}
            {/*        </MenuItem>*/}
            {/*      ))}*/}
            {/*    </Select>*/}
            {/*  </FormControl>*/}
            {/*  <FormControlLabel*/}
            {/*    label="Is common expense?"*/}
            {/*    control={*/}
            {/*      <Checkbox*/}
            {/*        //defaultChecked*/}
            {/*        color="secondary"*/}
            {/*        checked={isCommon}*/}
            {/*        onClick={(e) => setIsCommon(!isCommon)}*/}
            {/*      />*/}
            {/*    }*/}
            {/*  />*/}
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
