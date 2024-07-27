import { User } from "../../models/UserModel";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ChildrenProp } from "../../utils/types";
import { onUserStateChanged } from "../../services/userService";

export type UserCtx = {
  user: User | undefined;
  loading: boolean;
};

const defUserCtx = { user: undefined, loading: true };

// create context
const UserContext = createContext<UserCtx>(defUserCtx);

/**
 * Logged-in user context provider
 * @param children
 * @param user
 * @constructor
 */
export function UserContextProvider({ children }: ChildrenProp) {
  const [userLoggedIn, setUserLoggedIn] = useState<UserCtx>(defUserCtx);

  useEffect(() => {
    onUserStateChanged((u) => {
      setUserLoggedIn({ user: u, loading: false });
    });
  }, []);

  return (
    <UserContext.Provider value={userLoggedIn}>{children}</UserContext.Provider>
  );
}

/**
 * Return users collected from DB with a simplified function
 */
export const useUserContext = (): User | undefined => {
  return useContext(UserContext).user;
};

/**
 * Return an object containing user and loading state
 */
export const useFullUserContext = (): UserCtx => {
  return useContext(UserContext);
};
