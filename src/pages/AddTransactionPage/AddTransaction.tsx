import React, { useState } from "react";
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
import { CustomSnackbar } from "../../components/CustomSnackbar";
import { PayeeInput } from "./components/PayeeInput";
import { AmountInput } from "./components/AmountInput";
import { CategoryInput } from "./components/CategoryInput";
import { DateInput } from "./components/DateInput";
import { PaymentMethodInput } from "./components/PaymentMethodInput";
import { UserInput } from "./components/UserInput";
import { DescriptionInput } from "./components/DescriptionInput";
import { IsCommonInput } from "./components/IsCommonInput";

// list inputs in form
export type AddTransactionValues = {
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

  const [successSnackBarOpen, setSuccessSnackBarOpen] =
    useState<boolean>(false);
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTransactionValues>({
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

  const onSubmit: SubmitHandler<AddTransactionValues> = async (data) => {
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
    await addTransaction(transaction, currentUser!)
      .then(() => setSuccessSnackBarOpen(true))
      .catch((error) => {
        setErrorSnackBarOpen(true);

        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(
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

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, margin: "3% 0" }}>
          <PaperCard label={t(`${addTPrefix}label`)}>
            <Box display="flex" flexWrap={"wrap"}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit, (errors) =>
                  console.log(errors),
                )}
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
                    <PayeeInput control={control} requiredRules={true} />
                  </Grid>
                  <Grid item xs={1}>
                    <AmountInput
                      control={control}
                      requiredRules={true}
                      categories={categories}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <CategoryInput
                      control={control}
                      requiredRules={true}
                      categories={categories}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <DateInput control={control} requiredRules={true} />
                  </Grid>

                  <Grid item sm={2} xs={1}>
                    <PaymentMethodInput
                      control={control}
                      paymentMethods={paymentMethods}
                    />
                  </Grid>
                  <Grid item sm={2} xs={1}>
                    <UserInput control={control} users={users} />
                  </Grid>

                  <Grid item sm={2} xs={1}>
                    <DescriptionInput control={control} requiredRules={false} />
                  </Grid>

                  <Grid item xs={1}>
                    <IsCommonInput control={control} />
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
              </Box>
              <Box sx={{ margin: isMobile ? "5% 0 0 0" : "0 0 0 3%" }}>
                Placeholder to list where newly added transaction will appear.
                (WIP)
              </Box>
            </Box>
          </PaperCard>
        </Box>
      </Container>
      <CustomSnackbar
        severity={"success"}
        infoText={t(`${addTPrefix}validationMsg.successMsg`)}
        open={successSnackBarOpen}
        setOpen={setSuccessSnackBarOpen}
      />
      <CustomSnackbar
        severity={"error"}
        infoText={t(`${addTPrefix}validationMsg.errorMsg`)}
        open={errorSnackBarOpen}
        setOpen={setErrorSnackBarOpen}
      />
    </>
  );
}
