import {
  CreditCard,
  CreditScore,
  CurrencyExchange,
  LocalDining,
  MedicalInformation,
} from "@mui/icons-material";
import { CustomChipArray } from "../../../components/formComponents/CustomChipArray";
import { Control, Controller } from "react-hook-form";
import React from "react";
import { AddTransactionValues } from "../AddTransaction";
import { useTranslation } from "react-i18next";
import { PaymentMethod } from "../../../models/PaymentMethodModel";

type Params = {
  control: Control<AddTransactionValues>;
  paymentMethods: PaymentMethod[];
};

export function PaymentMethodInput(params: Params) {
  const { t } = useTranslation();
  const addTPrefix = "view.addTransaction.";

  return (
    <Controller
      name="paymentMethod"
      control={params.control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        let passingValues = params.paymentMethods.map((p) => {
          let icon = undefined;
          if (p.name === "mainDebitCard") {
            icon = <CreditCard />;
          } else if (p.name === "heathBenefitsCard") {
            icon = <MedicalInformation />;
          } else if (p.name === "creditCard") {
            icon = <CreditScore />;
          } else if (p.name === "otherBenefitsCard") {
            icon = <LocalDining />;
          } else if (p.name === "exchangeCard") {
            icon = <CurrencyExchange />;
          }

          return {
            chipLabel: t(`database.paymentMethod.${p.name}`),
            key: p.id,
            avatar: undefined,
            icon: icon,
          };
        });

        return (
          <CustomChipArray
            id={"paymentMethod"}
            label={t(`${addTPrefix}fields.paymentMethodLabel`)}
            value={value ? value.id : ""}
            modelsArray={passingValues}
            onChange={(id) => {
              //find the user based on the userID
              const p = params.paymentMethods.find((p) => p.id === id);
              onChange(p);
            }}
            error={!!error}
            helperText={
              error?.message || t(`${addTPrefix}optionalFieldSubText`)
            }
          />
        );
      }}
    />
  );
}
