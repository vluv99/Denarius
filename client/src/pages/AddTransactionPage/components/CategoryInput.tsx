import { CustomSelect } from "../../../components/formComponents/CustomSelect";
import { Control, Controller } from "react-hook-form";
import React from "react";
import { AddTransactionValues } from "../AddTransaction";
import { useTranslation } from "react-i18next";
import { Category } from "../../../models/CategoryModel";

type Params = {
  control: Control<AddTransactionValues>;
  requiredRules: boolean;
  categories: Category[];
};

export function CategoryInput(params: Params) {
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
      name="category"
      control={params.control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const values = params.categories.map((c) => ({
          id: c.id,
          name: t(`database.category.${c.name}`),
        }));
        return (
          <CustomSelect
            id="category"
            label={t(`${addTPrefix}fields.categoryLabel`)}
            value={value ? value.id : ""}
            onChange={(e) =>
              onChange(values.find((v) => v.id == e.target.value))
            }
            error={!!error}
            helperText={error?.message}
            modelsArray={values}
            fullWidth={true}
          />
        );
      }}
    />
  );
}
