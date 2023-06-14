import { query, collection, getDocs, where } from "firebase/firestore";
import { db} from "../firebaseConfig";

const pullBirdsById = async (id) => {
    try {
      const ids = id.map(bird => Number(bird));
      const q = query(collection(db, "birds"), where("id", "in", ids));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.log('error in util', error);
    }
  };

export { pullBirdsById }