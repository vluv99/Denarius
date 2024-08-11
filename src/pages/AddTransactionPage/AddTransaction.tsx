import React, { useState } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import { AddCircleOutline } from "@mui/icons-material";
import {
  useCategoryContext,
  usePaymentMethodContext,
  useUserContext,
} from "../../contexts/DBContexts";
import { User } from "../../models/UserModel";
import { Category } from "../../models/CategoryModel";
import { PaymentMethod } from "../../models/PaymentMethodModel";
import { SubmitHandler, useForm } from "react-hook-form";
import { addTransaction } from "../../services/transactionService";
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
                  width: { sm: "100%", lg: "50%" },
                  minWidth: { sm: "40vh", lg: "40vh" },
                }}
              >
                <Grid container spacing={2} columns={4} sx={{ flexGrow: 1 }}>
                  <Grid item xs={4} sm={2} md={2} lg={2}>
                    <PayeeInput control={control} requiredRules={true} />
                  </Grid>
                  <Grid item xs={4} sm={2} md={2} lg={2}>
                    <AmountInput
                      control={control}
                      requiredRules={true}
                      categories={categories}
                    />
                  </Grid>
                  <Grid item xs={4} sm={2} md={2} lg={2}>
                    <CategoryInput
                      control={control}
                      requiredRules={true}
                      categories={categories}
                    />
                  </Grid>
                  <Grid item xs={4} sm={2} md={2} lg={2}>
                    <DateInput control={control} requiredRules={true} />
                  </Grid>

                  <Grid item xs={4} sm={4} md={2} lg={4}>
                    <PaymentMethodInput
                      control={control}
                      paymentMethods={paymentMethods}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={2} lg={4}>
                    <UserInput control={control} users={users} />
                  </Grid>
                  <Grid item xs={4} sm={4} md={2} lg={4}>
                    <DescriptionInput control={control} requiredRules={false} />
                  </Grid>

                  <Grid item xs={4} sm={2} md={1} lg={2}>
                    <IsCommonInput control={control} />
                  </Grid>

                  <Grid item xs={4} sm={2} md={1} lg={2}>
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
              <Box
                sx={{
                  margin: { xs: "5% 0 0 0", sm: "0 0 0 3%" },
                }}
              >
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
