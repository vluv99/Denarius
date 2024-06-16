import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { User } from "../models/UserModel";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const USER_COLLECTION_NAME = "user";

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  console.log("registerUser");
  const auth = getAuth();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  // firebase user id
  const userID = userCredential.user.uid;
  const u = new User(userID, username, email);

  try {
    await setDoc(doc(db, USER_COLLECTION_NAME, u.userId), u.toDatabaseFormat());
  } catch (e) {
    console.error(e);
    await signOut(auth);
    throw e;
  }

  return u;
}

/**
 * Return the currently logged-in user's all available data
 */
export async function getLoggedInUser(): Promise<User> {
  console.log("getLoggedInUser");
  const auth = getAuth();
  const userID = auth.currentUser?.uid;
  if (userID) {
    const docSnap = await getDoc(doc(db, USER_COLLECTION_NAME, userID));
    if (!docSnap) {
      throw new Error("Could not get logged in user data");
    }
    return User.toUserFormat(docSnap.data());
  }
  throw new Error("No logged in user");
}

export function onUserStateChanged(callback: (user: User | undefined) => void) {
  console.log("onUserStateChanged callback");
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let newVar = await getLoggedInUser();
      callback(newVar);
    } else {
      // User is signed out
      callback(undefined);
    }
  });
}
