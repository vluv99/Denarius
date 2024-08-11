import { CustomChipArray } from "../../../components/formComponents/CustomChipArray";
import { Control, Controller } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";
import { AddTransactionValues } from "../AddTransaction";
import { User } from "../../../models/UserModel";

type Params = {
  control: Control<AddTransactionValues>;
  users: User[];
};

export function UserInput(params: Params) {
  const { t } = useTranslation();
  const addTPrefix = "view.addTransaction.";

  return (
    <Controller
      name="user"
      control={params.control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const passingValues = params.users.map((u) => ({
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
              const user = params.users.find((u) => u.userId === userID);
              onChange(user);
            }}
            //error={!!error}
            //helperText={error?.message || "Optional"}
          />
        );
      }}
    />
  );
}
