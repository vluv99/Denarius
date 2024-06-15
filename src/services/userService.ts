import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { User } from "../models/UserModel";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";

const USER_COLLECTION_NAME = "user";
const USER_COLLECTION_USERID = "userId";

async function addUserData(u: User /*, setStateCleared: () => void*/) {
  const action = await setDoc(
    doc(db, USER_COLLECTION_NAME, u.userId),
    u.toDatabaseFormat(),
  )
    //.then(() => setStateCleared())
    .then(() => console.log("User successfully added!"));
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  const auth = getAuth();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  // firebase user data
  const userID = userCredential.user.uid;
  const u = new User(userID, username, email);

  try {
    await addUserData(u);
  } catch (e) {
    console.error(e);
    signOut(auth);
  }

  return u;
}

export async function getLoggedInUser() {
  const auth = getAuth();
  const userID = auth.currentUser?.uid;
  if (userID) {
    const docSnap = await getDoc(doc(db, USER_COLLECTION_NAME, userID));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    return User.toUserFormat(docSnap.data());
  }
  return undefined;
}
