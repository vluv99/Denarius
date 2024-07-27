import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import {
  AddCircleOutline,
  CreditCard,
  CreditScore,
  CurrencyExchange,
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
import { Transaction } from "../../models/Transaction";
import { useTranslation } from "react-i18next";

// list inputs in form
type Inputs = {
  payee: string;
  category: Category | undefined;
  date: Date;
  amount: string;
  description: string;
  user: User;
  paymentMethod: PaymentMethod;
  isCommon: boolean;
};

export function AddTransaction() {
  const { t } = useTranslation();
  const addTPrefix = "view.addTransaction.";

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
      category: undefined,
      date: new Date(),
      amount: "",
      description: "",
      user: currentUser,
      paymentMethod: paymentMethods.find((p) => p.name === "mainDebitCard"),
      isCommon: false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //console.log(data);
    const transaction = new Transaction(
      "",
      new Date(),
      currentUser!.userId,
      data.date,
      data.category!,
      data.payee,
      Number(data.amount),
      data.user,
      data.paymentMethod,
      data.isCommon,
      data.description,
    );
    await addTransaction(transaction, currentUser!).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      window.alert(
        `${t(
          `${addTPrefix}validationMsg.errorMsg`,
        )}: ${errorCode}\n${errorMessage}`,
      );
    });
  };

  const rules = {
    required: {
      value: true,
      message: t(`${addTPrefix}validationMsg.requiredFieldMsg`),
    },
  };

  const amountRules: Omit<
    RegisterOptions<Inputs, "amount">,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  > = {
    required: {
      value: true,
      message: t(`${addTPrefix}validationMsg.requiredFieldMsg`),
    },
    pattern: {
      value: /^-?[0-9]\d*(\.\d+)?$/,
      message: t(`${addTPrefix}validationMsg.validNumberFieldMsg`),
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
          return t(`${addTPrefix}validationMsg.positiveNumberMsg`);
        } else if (
          formValues.category &&
          negatives.includes(formValues.category.name) &&
          Number(v) > 0
        ) {
          return t(`${addTPrefix}validationMsg.negativeNumberMsg`);
        }
        // if category isn't selected yet, don't throw error
        return true;
      },
    },
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, margin: "3% 0" }}>
        <PaperCard label={t(`${addTPrefix}label`)}>
          <Box display="flex" flexWrap={"wrap"}>
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
                        id={"payee-textfield"}
                        label={t(`${addTPrefix}fields.payeeLabel`)}
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error?.message}
                        fullWidth={true}
                        autoComplete={"on"}
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
                        name: t(`database.category.${c.name}`),
                      }));
                      return (
                        <CustomSelect
                          id="category"
                          label={t(`${addTPrefix}fields.categoryLabel`)}
                          value={value ? value.id : ""}
                          onChange={(e) =>
                            onChange(values.find((v) => v.id == e.target.value))
                          }
                          error={!!error}
                          helperText={error?.message}
                          modelsArray={values}
                          fullWidth={true}
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
                        label={t(`${addTPrefix}fields.dateLabel`)}
                        openTo="day"
                        views={["year", "month", "day"]}
                        value={moment(value)}
                        onChange={onChange}
                        error={!!error}
                        helperText={error?.message}
                        fullWidth={true}
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
                        label={t(`${addTPrefix}fields.amountLabel`)}
                        moneySign={"Ft"}
                        autoComplete={"off"}
                        onChange={onChange}
                        error={!!error}
                        helperText={error?.message}
                        fullWidth={true}
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
                        if (p.name === "mainDebitCard") {
                          icon = <CreditCard />;
                        } else if (p.name === "heathBenefitsCard") {
                          icon = <MedicalInformation />;
                        } else if (p.name === "ceditCard") {
                          icon = <CreditScore />;
                        } else if (p.name === "otherBenefitsCard") {
                          icon = <LocalDining />;
                        } else if (p.name === "exchangeCard") {
                          icon = <CurrencyExchange />;
                        }

                        return {
                          chipLabel: t(`database.paymentMethod.${p.name}`),
                          key: p.id,
                          avatar: undefined,
                          icon: icon,
                        };
                      });

                      return (
                        <CustomChipArray
                          id={"paymentMethod"}
                          label={t(`${addTPrefix}fields.paymentMethodLabel`)}
                          value={value ? value.id : ""}
                          modelsArray={passingValues}
                          onChange={(id) => {
                            //find the user based on the userID
                            const p = paymentMethods.find((p) => p.id === id);
                            onChange(p);
                          }}
                          error={!!error}
                          helperText={
                            error?.message ||
                            t(`${addTPrefix}optionalFieldSubText`)
                          }
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
                        id={"description-textfield"}
                        label={t(`${addTPrefix}fields.descriptionLabel`)}
                        type="text"
                        value={value}
                        onChange={onChange}
                        //error={!!error}
                        helperText={
                          error?.message ||
                          t(`${addTPrefix}optionalFieldSubText`)
                        }
                        multiline={true}
                        fullWidth={true}
                        autoComplete={"on"}
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
                          label={t(`${addTPrefix}fields.userLabel`)}
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
                        label={t(`${addTPrefix}fields.isCommonLabel`)}
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
                    {t(`${addTPrefix}addButtonLabel`)}
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
            <Box sx={{ margin: isMobile ? "5% 0 0 0" : "0 0 0 3%" }}>
              Placeholder to list where newly added transaction will appear.
              (WIP)
            </Box>
          </Box>
        </PaperCard>
      </Box>
    </Container>
  );
}
