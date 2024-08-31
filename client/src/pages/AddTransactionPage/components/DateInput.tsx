import { CustomDatePicker } from "../../../components/formComponents/CustomDatePicker";
import moment from "moment/moment";
import { Control, Controller } from "react-hook-form";
import React from "react";
import { AddTransactionValues } from "../AddTransaction";
import { useTranslation } from "react-i18next";

type Params = {
  control: Control<AddTransactionValues>;
  requiredRules: boolean;
};

export function DateInput(params: Params) {
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
      name="date"
      control={params.control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <CustomDatePicker
          label={t(`${addTPrefix}fields.dateLabel`)}
          openTo="day"
          views={["year", "month", "day"]}
          value={moment(value)}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
          fullWidth={true}
        />
      )}
    />
  );
}
