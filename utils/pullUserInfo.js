import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

async function getUserData (id) {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
}

export { getUserData }