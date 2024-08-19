import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenProp } from "../../utils/types";
import { PaymentMethod } from "../../models/PaymentMethodModel";
import { useGetPaymentMethodData } from "../../hooks/cardHooks";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;

export type PaymentMethodCtx = {
  paymentMethods: PaymentMethod[] | undefined;
  payMethLoading: boolean;
};
const defPaymentMethodCtx = { paymentMethods: undefined, payMethLoading: true };

// create context
const PaymentMethodContext =
  createContext<PaymentMethodCtx>(defPaymentMethodCtx);

/**
 * Function body of the React context provider element
 * @param children
 * @constructor
 */
export function PaymentMethodContextProvider({ children }: ChildrenProp) {
  const paymentMethods: PaymentMethod[] = useGetPaymentMethodData();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (paymentMethods === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [paymentMethods]);

  return (
    <PaymentMethodContext.Provider
      value={{ paymentMethods, payMethLoading: loading }}
    >
      {children}
    </PaymentMethodContext.Provider>
  );
}

/**
 * Return paymentMethods collected from DB with a simplified function
 */
export const usePaymentMethodContext = (): PaymentMethodCtx => {
  return useContext(PaymentMethodContext);
};
