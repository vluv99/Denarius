import { isMobile } from "react-device-detect";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { huHU } from "@mui/x-data-grid/locales";

import { useGetUserBrowserTheme } from "../../theme/consts";
import { Box, Typography } from "@mui/material";
import { useTransactionContext } from "../../contexts/DBContexts/TransactionContext";
import {
  useCategoryContext,
  usePaymentMethodContext,
  useUserContext,
} from "../../contexts/DBContexts";
import { Transaction } from "../../models/Transaction";
import { User } from "../../models/UserModel";
import { useTranslation } from "react-i18next";

export const ListTransactions = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const categories = useCategoryContext();
  const paymentMethods = usePaymentMethodContext();
  const currentUser = useUserContext();
  const users: User[] = [
    currentUser! /*,
    new User("0", "dpeter99@gmail.com", "dpeter99"),*/,
  ];

  const columns: GridColDef<Transaction>[] = [
    {
      field: "id",
      headerName: t("view.listTransaction.columns.idHeader"),
      width: 100,
    },
    {
      field: "date",
      headerName: t("view.listTransaction.columns.dateHeader"),
      type: "date",
      flex: 0,
    },
    {
      field: "payee",
      headerName: t("view.listTransaction.columns.payeeHeader"),
      flex: 0,
      minWidth: isMobile ? 110 : 180,
    },
    {
      field: "category",
      headerName: t("view.listTransaction.columns.categoryHeader"),
      flex: 0,
      minWidth: isMobile ? 130 : 160,
      valueGetter: (value) => categories.find((d) => d.id === value)?.name,
    },
    {
      field: "description",
      headerName: t("view.listTransaction.columns.descriptionHeader"),
      sortable: false,
      flex: 0,
      minWidth: isMobile ? 110 : 220,
    },
    {
      field: "amount",
      headerName: t("view.listTransaction.columns.amountHeader"),
      type: "number",
      flex: 0,
    },
    {
      field: "user",
      headerName: t("view.listTransaction.columns.userHeader"),
      flex: 0,
      width: 130,
      valueGetter: (value) => users.find((d) => d.userId === value)?.username,
    },
    {
      field: "isCommon",
      headerName: t("view.listTransaction.columns.isCommonHeader"),
      type: "boolean",
      flex: 0,
      minWidth: 130,
    },
    {
      field: "paymentMethod",
      headerName: t("view.listTransaction.columns.paymentMethodHeader"),
      flex: 0,
      minWidth: 130,
      valueGetter: (value) => paymentMethods.find((d) => d.id === value)?.name,
    },
  ];

  //const { transactions } = useContext(TransactionContext);

  const rows = useTransactionContext();

  const theme = useGetUserBrowserTheme();

  return (
    <Box
      sx={{
        //width: isMobile || window.screen.width < 1200 ? "95%" : "80%",
        width: isMobile ? "95%" : "80%",
        margin: isMobile ? "5% auto" : "3% auto",
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
          {t("view.listTransaction.label")}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          localeText={
            language === "hu-HU"
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
            return params.value > 0 ? "plus" : "minus";
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
};
