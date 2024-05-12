import React, { useContext, useState } from "react";

type ContextProp = {
  children: React.ReactNode;
};

type ValueProp = {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = React.createContext({} as ValueProp); //create the context API

//function body
export function ContextProvider({ children }: ContextProp) {
  const [userId, setUserId] = useState<string>("test1");

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = (): ValueProp => {
  return useContext(AppContext);
};
