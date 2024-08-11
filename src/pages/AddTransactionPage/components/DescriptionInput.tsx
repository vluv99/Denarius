import { CustomTextField } from "../../../components/formComponents/CustomTextField";
import { Control, Controller } from "react-hook-form";
import React from "react";
import { AddTransactionValues } from "../AddTransaction";
import { Category } from "../../../models/CategoryModel";
import { useTranslation } from "react-i18next";

type Params = {
  control: Control<AddTransactionValues>;
  requiredRules: boolean;
};

export function DescriptionInput(params: Params) {
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
      name="description"
      control={params.control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <CustomTextField
          id={"description-textfield"}
          label={t(`${addTPrefix}fields.descriptionLabel`)}
          type="text"
          value={value}
          onChange={onChange}
          //error={!!error}
          helperText={error?.message || t(`${addTPrefix}optionalFieldSubText`)}
          multiline={true}
          fullWidth={true}
          autoComplete={"on"}
        />
      )}
    />
  );
}
