import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { huHU } from "@mui/x-data-grid/locales";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTransactionContext } from "../../contexts/DBContexts/TransactionContext";
import {
  useCategoryContext,
  usePaymentMethodContext,
  useUserContext,
} from "../../contexts/DBContexts";
import { Transaction } from "../../models/Transaction";
import { User } from "../../models/UserModel";
import { useTranslation } from "react-i18next";
import { Loading } from "../LoadingPage/Loading";
import { Category } from "../../models/CategoryModel";
import { PaymentMethod } from "../../models/PaymentMethodModel";
import React, { useEffect, useState } from "react";

export const ListTransactions = () => {
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
    <ListTransactionsTable
      categories={categories!}
      paymentMethods={paymentMethods!}
      users={users}
    />
  );
};

function ListTransactionsTable({
  categories,
  paymentMethods,
  users,
}: {
  categories: Category[];
  paymentMethods: PaymentMethod[];
  users: User[];
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const listTPrefix = "view.listTransaction.";

  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const columns: GridColDef<Transaction>[] = [
    {
      field: "id",
      headerName: t(`${listTPrefix}columns.idHeader`),
      width: 100,
    },
    {
      field: "date",
      headerName: t(`${listTPrefix}columns.dateHeader`),
      type: "date",
      flex: 0,
    },
    {
      field: "payee",
      headerName: t(`${listTPrefix}columns.payeeHeader`),
      flex: 0,
      minWidth: lessThanSmall ? 110 : 180,
    },
    {
      field: "amount",
      headerName: t(`${listTPrefix}columns.amountHeader`),
      type: "number",
      flex: 0,
      minWidth: 125,
    },
    {
      field: "category",
      headerName: t(`${listTPrefix}columns.categoryHeader`),
      flex: 0,
      minWidth: lessThanSmall ? 130 : 160,
      valueGetter: (value) =>
        t(`database.category.${categories!.find((d) => d.id === value)?.name}`),
    },
    {
      field: "description",
      headerName: t(`${listTPrefix}columns.descriptionHeader`),
      sortable: false,
      flex: 0,
      minWidth: lessThanSmall ? 110 : 220,
    },
    {
      field: "user",
      headerName: t(`${listTPrefix}columns.userHeader`),
      flex: 0,
      width: 130,
      valueGetter: (value) => users.find((d) => d.userId === value)?.username,
    },
    {
      field: "isCommon",
      headerName: t(`${listTPrefix}columns.isCommonHeader`),
      type: "boolean",
      flex: 0,
      minWidth: 130,
    },
    {
      field: "paymentMethod",
      headerName: t(`${listTPrefix}columns.paymentMethodHeader`),
      flex: 0,
      minWidth: 160,
      valueGetter: (value) =>
        t(
          `database.paymentMethod.${paymentMethods.find((d) => d.id === value)
            ?.name}`,
        ),
    },
  ];

  const rows = useTransactionContext();

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "92%", lg: "80%" },
        margin: { xs: "5% auto", sm: "3% auto" },
        "& .plus": {
          color: theme.palette.success.main,
          fontWeight: "bold",
        },
        "& .minus": {
          color: theme.palette.error.main,
          fontWeight: "bold",
        },
      }}
      //className="list--container"
    >
      <div>
        <Typography gutterBottom variant="h5" component="div">
          {t(`${listTPrefix}label`)}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          localeText={
            language.includes("hu")
              ? huHU.components.MuiDataGrid.defaultProps.localeText
              : undefined
          }
          autoHeight={true}
          //autoPageSize={true} // doesn't work well with filtering
          disableColumnMenu={true}
          ignoreDiacritics={true}
          editMode="row"
          slots={{
            toolbar: GridToolbar,
          }}
          getCellClassName={(params: GridCellParams) => {
            if (params.field !== "amount" || params.value == null) {
              return "";
            }
            return Number(params.value) > 0 ? "plus" : "minus";
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            columns: {
              columnVisibilityModel: {
                // Hide columns
                id: false,
              },
            },
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }],
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </Box>
  );
}
