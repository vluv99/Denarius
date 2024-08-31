import { CustomTextField } from "../../../components/formComponents/CustomTextField";
import { Control, Controller } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";
import { AddTransactionValues } from "../AddTransaction";

type Params = {
  control: Control<AddTransactionValues>;
  requiredRules: boolean;
};

export function PayeeInput(params: Params) {
  const { t } = useTranslation();
  const addTPrefix = "view.addTransaction.";

  const rules = {
    required: {
      value: params.requiredRules,
      message: t(`${addTPrefix}validationMsg.requiredFieldMsg`),
    },
  };

  return (
    <Controller
      name="payee"
      control={params.control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
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
  );
}
