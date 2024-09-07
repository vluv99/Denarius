import {
  Container,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { PaperCard } from "../../components/PaperCard";
import React, { useEffect, useState } from "react";
import { Last30DaysSimple } from "./components/Last30DaysSimple";
import { useTransactionContext } from "../../contexts/DBContexts/TransactionContext";
import {
  useCategoryContext,
  usePaymentMethodContext,
  useUserContext,
} from "../../contexts/DBContexts";
import { Loading } from "../LoadingPage/Loading";
import { useTranslation } from "react-i18next";
//import { TransactionContext } from "../../contex/GlobalState";

//TODO: get a currencyformatter set by the account type

const Item = styled(PaperCard)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Home = () => {
  const { t } = useTranslation();
  const homePrefix = "view.dasboard.";
  const transactions = useTransactionContext();
  const { categories, catLoading } = useCategoryContext();
  const { paymentMethods, payMethLoading } = usePaymentMethodContext();
  const currentUser = useUserContext();
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

  const colCount = 16;

  return (
    <Container sx={{ margin: "3% auto" }}>
      <Grid container spacing={2} columns={colCount} alignItems={"stretch"}>
        <Grid item sm={colCount * 0.25} xs={colCount * 0.5}>
          <Item label={t(`${homePrefix}grid_1.label`)}>
            <Last30DaysSimple transactions={transactions} />
          </Item>
        </Grid>
        <Grid item sm={colCount * 0.25} xs={colCount * 0.5}>
          <Item label="Last month's Income:">
            <div>xs=2</div>
          </Item>
        </Grid>
        <Grid item sm={colCount * 0.25} xs={colCount * 0.5}>
          <Item label="Last month's Rend/Utils:">
            <div>xs=2</div>
          </Item>
        </Grid>
        <Grid item sm={colCount * 0.25} xs={colCount * 0.5}>
          <Item label="Last 30 days Transaction count:">
            <div>xs=2</div>
          </Item>
        </Grid>
        <Grid item sm={colCount * 0.5} xs={colCount}>
          <Item label="Compare last 30 days Expenses:">
            <div>xs=8</div>
          </Item>
        </Grid>
        <Grid item sm={colCount * 0.5} xs={colCount}>
          <Item label="Last 5 common Expense:">
            <div>xs=8</div>
          </Item>
        </Grid>
        <Grid item sm={colCount * 0.4} xs={colCount}>
          <Item label="5 most expensive  Category (lost of categories):">
            <div>xs=6</div>
          </Item>
        </Grid>
        <Grid item sm={colCount * 0.6} xs={colCount}>
          <Item label="Last 30 days (tree map of expense categories):">
            <div>xs=10</div>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};
