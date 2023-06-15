import { query, collection, getDocs, where, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db} from "../firebaseConfig";



const addToPerchAlert = async (birdId, userId) => {
    const userRef = doc(db, "users", userId);
    try {
       await updateDoc(userRef, {
        perch_list: arrayUnion(birdId)
      })
    } catch (error) {
      console.log('error in perch util', error);
    } finally {
    return birdId;
    }
  };
  const removeFromPerchAlert = async (birdId, userId) => {
    const userRef = doc(db, "users", userId);
    try {
       await updateDoc(userRef, {
        perch_list: arrayRemove(birdId)
      })
    } catch (error) {
      console.log('error in perch util', error);
    } finally {
    return birdId;
    }
  };


export {addToPerchAlert, removeFromPerchAlert};