import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, setDoc, doc, Firestore, getUser } from "firebase/firestore";
import { db} from "../firebaseConfig";

async function pullBirdData(){

    const arr = [];
    await getDocs(collection(db, "birds"))
    .then((data) => {
    data.forEach(user=>{
    // console.log(user._document.data.value.mapValue.fields);
    arr.push(user._document.data.value.mapValue.fields);
    })
});
return arr;
}

export { pullBirdData }