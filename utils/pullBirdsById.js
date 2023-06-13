import { query, collection, getDocs, where } from "firebase/firestore";
import { db} from "../firebaseConfig";

const pullBirdsById = async (id) => {
    try {
      console.log(id);
        console.log(id, 'array');
      const q = query(collection(db, "birds"), where("id", "in", id.map(bird => Number(bird))));
      const querySnapshot = await getDocs(q);
      return birdData = querySnapshot.docs.map((doc) => doc.data());
   
 
    } catch (error) {
      console.log(error);
    }
  };

export { pullBirdsById }