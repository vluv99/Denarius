import { createContext, useContext, useState } from "react";
import { Category } from "../../models/CategoryModel";
import { ChildrenProp } from "../../utils/types";
import { PaymentMethod } from "../../models/PaymentMethodModel";
import { useGetPaymentMethodData } from "../../hooks/cardHooks";

// create context
const PaymentMethodContext = createContext<PaymentMethod[]>([]);

/**
 * Function body of the React context provider element
 * @param children
 * @constructor
 */
export function PaymentMethodContextProvider({ children }: ChildrenProp) {
  const paymentMethods: PaymentMethod[] = useGetPaymentMethodData();

  return (
    <PaymentMethodContext.Provider value={paymentMethods}>
      {children}
    </PaymentMethodContext.Provider>
  );
}

/**
 * Return paymentMethods collected from DB with a simplified function
 */
export const usePaymentMethodContext = (): PaymentMethod[] => {
  return useContext(PaymentMethodContext);
};
