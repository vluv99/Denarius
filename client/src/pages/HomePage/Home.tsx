import {
  Box,
  Container,
  Grid,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { PaperCard } from "../../components/PaperCard";
import React, { useEffect, useState } from "react";
import { Last30DaysExpense } from "./components/Last30DaysExpense";
import { useTransactionContext } from "../../contexts/DBContexts/TransactionContext";
import {
  useCategoryContext,
  usePaymentMethodContext,
  useUserContext,
} from "../../contexts/DBContexts";
import { Loading } from "../LoadingPage/Loading";
import { useTranslation } from "react-i18next";
import { LastMonthIncome } from "./components/LastMonthIncome";
import { LastMonthUtilsNRent } from "./components/LastMonthUtilsNRent";
import { Last30daysCount } from "./components/Last30daysCount";
import { CompareLast30DaysExpense } from "./components/CompareLast30DaysExpense";
import { TreemapOfLast30Days } from "./components/TreemapOfLast30Days";
//import { TransactionContext } from "../../contex/GlobalState";

//TODO: get a currencyformatter set by the account type

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: "10px",
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

export const Home = () => {
  const transactions = useTransactionContext();
  const { categories, catLoading } = useCategoryContext();
  const { paymentLoading } = usePaymentMethodContext();
  const currentUser = useUserContext();
  const [loading, setLoading] = useState(catLoading);

  useEffect(() => {
    if (catLoading || paymentLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [catLoading, paymentLoading]);

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
          <GridItem>
            <Last30DaysExpense transactions={transactions} />
          </GridItem>
        </Grid>
        <Grid item sm={colCount * 0.25} xs={colCount * 0.5}>
          <GridItem>
            <LastMonthIncome transactions={transactions} />
          </GridItem>
        </Grid>
        <Grid item sm={colCount * 0.25} xs={colCount * 0.5}>
          <GridItem>
            <LastMonthUtilsNRent
              transactions={transactions}
              categories={categories!}
            />
          </GridItem>
        </Grid>
        <Grid item sm={colCount * 0.25} xs={colCount * 0.5}>
          <GridItem>
            <Last30daysCount transactions={transactions} />
          </GridItem>
        </Grid>
        <Grid item sm={colCount * 0.5} xs={colCount}>
          <GridItem /*label="Compare last 30 days Expenses:"*/>
            <Container sx={{ padding: { xs: "10px", sm: "10px" } }}>
              <CompareLast30DaysExpense
                transactions={transactions}
                currentUser={currentUser!}
              />
            </Container>
          </GridItem>
        </Grid>
        <Grid item sm={colCount * 0.5} xs={colCount}>
          <GridItem /*label="Last 5 common Expense:"*/>
            <div>xs=8</div>
          </GridItem>
        </Grid>
        <Grid item sm={colCount * 0.4} xs={colCount}>
          <GridItem /*label="5 most expensive  Category (lost of categories):"*/
          >
            <div>xs=6</div>
          </GridItem>
        </Grid>
        <Grid item sm={colCount * 0.6} xs={colCount}>
          <GridItem /*label="Last 30 days (tree map of expense categories):"*/>
            <TreemapOfLast30Days
              transactions={transactions}
              categories={categories!}
            />
          </GridItem>
        </Grid>
      </Grid>
    </Container>
  );
};

export function GridItem({ children }: { children: React.ReactNode }) {
  return <Item elevation={4}>{children}</Item>;
}
