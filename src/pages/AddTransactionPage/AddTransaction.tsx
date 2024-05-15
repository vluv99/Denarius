import React, { FormEvent, useState } from "react";
import moment, { Moment } from "moment";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Transaction } from "../../models/Transaction";
import { PaperCard } from "../../components/PaperCard";
import { DatePicker } from "@mui/x-date-pickers";
import { users } from "../../models/UserModel";
import { AccountCircle, AddCircleOutline } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { cardTypes } from "../ListTransactionsPage/TestTransactions";
import { isMobile } from "react-device-detect";
import { useGetCategoryData } from "../../hooks/categoryHooks";
//import { useAddTransactionData } from "../../hooks/transactionHooks";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";

export function AddTransaction() {
  const [payee, setPayee] = useState("");
  const [category, setCategory] = React.useState("");
  const [date, setDate] = React.useState<Moment | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [user, setUser] = React.useState("");
  const [card, setCard] = React.useState("");
  const [isCommon, setIsCommon] = useState(true);
  const [cleared, setCleared] = React.useState<boolean>(false);

  const categories = useGetCategoryData();

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleUserChange = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };

  const handleCardChange = (event: SelectChangeEvent) => {
    setCard(event.target.value as string);
  };

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleClear = () => {
    setPayee("");
    setCategory("");
    setDate(null);
    setAmount(null);
    setDescription("");
    setUser("");
    setCard("");
    setIsCommon(true);
  };

  const toNumberOptional = (value: string) => {
    if (Number.parseInt(value)) {
      return Number(value);
    }
    return null;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAmountValid = amount !== null;
    const isDateValid = date !== null;
    const isPayeeValid = payee !== "";
    const isCategoryValid = category !== "";
    const isUserValid = user !== "";
    const isCardValid = card !== "";

    if (
      !isAmountValid &&
      !isDateValid &&
      !isPayeeValid &&
      !isCategoryValid &&
      !isUserValid &&
      !isCardValid
    ) {
      return;
    }

    const newTransaction: Transaction = {
      date: moment(date).toDate(),
      payee,
      category,
      description,
      amount: +amount!,
      user,
      isCommon,
      cardType: card,
    };

    //await useAddTransactionData(newTransaction, handleClear);
    try {
      await addDoc(collection(db, "transaction"), newTransaction);
      handleClear();
      console.log("Transaction successfully added");
    } catch (e) {
      console.error("Unsuccessful", e);
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, margin: "3% 0" }}>
        <PaperCard label="Add New Transactions">
          <Box
            component="form"
            sx={{
              display: "flex",
              //flexDirection: "column",
              //alignItems: "center",
              flexWrap: "wrap",
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            onSubmit={onSubmit}
          >
            <TextField
              id="shop-textField"
              label="Payee"
              variant="outlined"
              type="text"
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories.map((cat, index) => (
                  <MenuItem key={"category-select-" + index} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              label="Date"
              openTo="month"
              views={["year", "month", "day"]}
              value={date}
              onChange={(newDate) => setDate(newDate)}
              slotProps={{
                field: { clearable: true, onClear: () => setCleared(true) },
              }}
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="amounttextField"
                inputMode="numeric"
                value={amount ?? ""}
                onChange={(e) => setAmount(toNumberOptional(e.target.value))}
                startAdornment={
                  <InputAdornment position="start">Ft</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
            <TextField
              id="description-textField"
              label="Description"
              multiline
              variant="outlined"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel id="user-label">User</InputLabel>
              <Select
                labelId="user-label"
                id="user-select"
                value={user}
                label="User"
                onChange={handleUserChange}
              >
                {Object.entries(users).map((value) => (
                  <MenuItem key={"user-select-" + value[0]} value={value[0]}>
                    <AccountCircle />
                    {value[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel id="card-label">Card type</InputLabel>
              <Select
                labelId="card-label"
                id="card-select"
                value={card}
                label="Card type"
                onChange={handleCardChange}
              >
                {Object.entries(cardTypes).map((value) => (
                  <MenuItem key={"card-select-" + value[0]} value={value[0]}>
                    {value[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              label="Is common expense?"
              control={
                <Checkbox
                  //defaultChecked
                  color="secondary"
                  checked={isCommon}
                  onClick={(e) => setIsCommon(!isCommon)}
                />
              }
            />
            <Box
              sx={{
                display: "flex",
                flexGrow: isMobile ? 1 : 2,
                minWidth: isMobile ? "25ch" : "50ch",
                flexDirection: isMobile ? "column" : "initial", //TODO: fix the mobile view for these buttons somehow???
              }}
            >
              <FormControl
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                  marginRight: isMobile ? 0 : 1,
                  width: "25ch",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  color="secondary"
                  type="reset"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </FormControl>
              <FormControl
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                  marginLeft: isMobile ? 0 : 1,
                  width: "25ch",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  type="submit"
                >
                  Add
                </Button>
              </FormControl>
            </Box>
          </Box>
        </PaperCard>
      </Box>
    </Container>
  );
}
