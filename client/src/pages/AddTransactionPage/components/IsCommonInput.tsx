import { CustomCheckbox } from "../../../components/formComponents/CustomChecbox";
import { Control, Controller } from "react-hook-form";
import React from "react";
import { AddTransactionValues } from "../AddTransaction";
import { useTranslation } from "react-i18next";

type Params = {
  control: Control<AddTransactionValues>;
};

export function IsCommonInput(params: Params) {
  const { t } = useTranslation();
  const addTPrefix = "view.addTransaction.";

  return (
    <Controller
      name="isCommon"
      control={params.control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <CustomCheckbox
          label={t(`${addTPrefix}fields.isCommonLabel`)}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
}
