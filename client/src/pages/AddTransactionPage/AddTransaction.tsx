import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { PaperCard } from "../../components/PaperCard";
import { AddCircleOutline, Close, DoneOutline } from "@mui/icons-material";
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
import { Loading } from "../LoadingPage/Loading";
import { useTransactionContext } from "../../contexts/DBContexts/TransactionContext";
import { huHU } from "@mui/x-data-grid/locales";
import { formatToCurrency, isDateToday } from "../../utils/utils";

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
  const { categories, catLoading } = useCategoryContext();
  const { paymentMethods, payMethLoading } = usePaymentMethodContext();
  const currentUser = useUserContext();
  const users: User[] = [
    currentUser! /*,
    new User("0", "dpeter99@gmail.com", "dpeter99"),*/,
  ];

  const [loading, setLoading] = useState(catLoading);

  useEffect(() => {
    if (catLoading || payMethLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [catLoading, payMethLoading]);

  /**
   * If anything is loading from the DB, the page should show a loading screen
   */
  if (loading) {
    return <Loading />;
  }

  return (
    <AddTransactionForm
      categories={categories!}
      paymentMethods={paymentMethods!}
      currentUser={currentUser!}
      users={users}
    />
  );
}

function AddTransactionForm({
  categories,
  paymentMethods,
  currentUser,
  users,
}: {
  categories: Category[];
  paymentMethods: PaymentMethod[];
  currentUser: User;
  users: User[];
}) {
  const { t } = useTranslation();
  const addTPrefix = "view.addTransaction.";

  const [successSnackBarOpen, setSuccessSnackBarOpen] =
    useState<boolean>(false);
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
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
      data.category?.id!,
      data.payee,
      Number(data.amount),
      data.user.userId,
      data.paymentMethod.id,
      data.isCommon,
      data.description,
    );
    await addTransaction(transaction, currentUser!)
      .then(() => {
        setSuccessSnackBarOpen(true);
        reset(); // update form back to default values
      })
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
      <Container
        sx={{
          padding: { xs: "0px", sm: "0 24px", md: "0 24px", lg: "0 24px" },
        }}
      >
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
                  flexGrow: 1,
                  margin: {
                    xs: "5% 0 0 0",
                    sm: "5% auto 0 auto",
                    md: "3% auto 0 auto",
                    lg: "0 0 0 3%",
                  },
                  width: "min-content",
                }}
              >
                <ListTodaysTransactions
                  categories={categories}
                  paymentMethods={paymentMethods}
                  currentUser={currentUser}
                  users={users}
                />
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

export function ListTodaysTransactions({
  categories,
  paymentMethods,
  currentUser,
  users,
}: {
  categories: Category[];
  paymentMethods: PaymentMethod[];
  currentUser: User;
  users: User[];
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const addTPrefix = "view.addTransaction.";

  const theme = useTheme();

  const transactions = useTransactionContext();
  const rows = useMemo(
    () =>
      transactions
        .filter((t) => isDateToday(t.creationDate))
        .sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime()),
    [transactions],
  );

  function getSx(i: number) {
    return {
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr 2fr",
        sm: "1fr 2fr 1fr 1fr",
      },
      justifyItems: "center",
      alignItems: "center",
      padding: "4px",
      backgroundColor:
        i % 2
          ? "inherit"
          : `rgb( from ${theme.palette.primary.main} r g b / 0.21)`,
    };
  }

  return (
    <Box
      sx={{
        "& .plus": {
          color: theme.palette.success.main,
          fontWeight: "bold",
        },
        "& .minus": {
          color: theme.palette.error.main,
          fontWeight: "bold",
        },
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "4px",
        textAlign: "center",
      }}
    >
      <Box sx={{ ...getSx(1), fontWeight: "bold", padding: "8px" }}>
        <Box>Amount</Box>
        <Box>Payee</Box>
        <Box>Category</Box>
        <Box>Common</Box>
      </Box>
      {rows.length > 0 ? (
        rows.map((row, i) => (
          <Box sx={getSx(i)}>
            <Box className={row.amount > 0 ? "plus" : "minus"}>
              {formatToCurrency(row.amount)}
            </Box>
            <Box>{row.payee}</Box>
            <Box>
              {t(
                `database.category.${categories.find(
                  (c) => c.id === row.category,
                )?.name}`,
              )}
            </Box>
            <Box sx={{ height: "24px" }}>
              {row.isCommon ? <DoneOutline /> : <Close />}
            </Box>
          </Box>
        ))
      ) : (
        <Typography
          sx={{
            padding: "8px",
            backgroundColor: `rgb( from ${theme.palette.primary.main} r g b / 0.21)`,
          }}
        >
          {t(`${addTPrefix}noTransactionsTodayText`)}
        </Typography>
      )}
    </Box>
  );
}
