import { CustomMoneyNumberFiled } from "../../../components/formComponents/CustomMoneyNumberField";
import { Control, Controller } from "react-hook-form";
import React from "react";
import { AddTransactionValues } from "../AddTransaction";
import { useTranslation } from "react-i18next";
import { RegisterOptions } from "react-hook-form/dist/types/validator";
import { Category } from "../../../models/CategoryModel";

type Params = {
  control: Control<AddTransactionValues>;
  requiredRules: boolean;
  categories: Category[];
};

export function AmountInput(params: Params) {
  const { t } = useTranslation();
  const addTPrefix = "view.addTransaction.";

  const amountRules: Omit<
    RegisterOptions<AddTransactionValues, "amount">,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  > = {
    required: {
      value: params.requiredRules,
      message: t(`${addTPrefix}validationMsg.requiredFieldMsg`),
    },
    pattern: {
      value: /^-?[0-9]\d*(\.\d+)?$/,
      message: t(`${addTPrefix}validationMsg.validNumberFieldMsg`),
    },
    validate: {
      expenseCategory: (v: string, formValues) => {
        // if return is string or false it's error, if true it's valid

        const positives = params.categories
          .filter((c) => c.expenseType === "Income")
          .map((c) => c.name);
        const negatives = params.categories
          .filter((c) => c.expenseType === "Expense")
          .map((c) => c.name);

        if (
          formValues.category &&
          positives.includes(formValues.category.name) &&
          Number(v) < 0
        ) {
          return t(`${addTPrefix}validationMsg.positiveNumberMsg`);
        } else if (
          formValues.category &&
          negatives.includes(formValues.category.name) &&
          Number(v) > 0
        ) {
          return t(`${addTPrefix}validationMsg.negativeNumberMsg`);
        }
        // if category isn't selected yet, don't throw error
        return true;
      },
    },
  };

  return (
    <Controller
      name="amount"
      control={params.control}
      rules={amountRules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <CustomMoneyNumberFiled
          id={"amount"}
          value={value}
          label={t(`${addTPrefix}fields.amountLabel`)}
          moneySign={"Ft"}
          autoComplete={"off"}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
          fullWidth={true}
        />
      )}
    />
  );
}
