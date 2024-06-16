import { User } from "../../models/UserModel";
import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenProp } from "../../utils/types";
import { onUserStateChanged } from "../../services/userService";

// create context
const UserContext = createContext<User | undefined>(undefined);

/**
 * Logged-in user context provider
 * @param children
 * @param user
 * @constructor
 */
export function UserContextProvider({ children }: ChildrenProp) {
  const [userLoggedIn, setUserLoggedIn] = useState<User | undefined>(undefined);

  useEffect(() => {
    onUserStateChanged(setUserLoggedIn);
  }, []);

  return (
    <UserContext.Provider value={userLoggedIn}>{children}</UserContext.Provider>
  );
}

/**
 * Return users collected from DB with a simplified function
 */
export const useUserContext = (): User | undefined => {
  return useContext(UserContext);
};
