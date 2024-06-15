import { User } from "../../models/UserModel";
import { createContext, useContext } from "react";
import { ChildrenProp } from "../../utils/types";
import { getLoggedInUser } from "../../services/userService";

// create context
const UserContext = createContext<User | undefined>(undefined);

/**
 * Logged-in user context provider
 * @param children
 * @param user
 * @constructor
 */
export function UserContextProvider({
  children,
  user,
}: ChildrenProp & { user?: User }) {
  //const user: User = await getLoggedInUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

/**
 * Return users collected from DB with a simplified function
 */
export const useUserContext = (): User | undefined => {
  return useContext(UserContext);
};
