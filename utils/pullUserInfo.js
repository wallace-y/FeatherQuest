import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

const user1 = auth.currentUser;


// async function getUserData(id){

//     const arr = [];
//     await getDocs(collection(db, "users", id))
//     .then((data) => {
//         console.log('data in util', data);
//     data.forEach(user=>{
//     // console.log(user._document.data.value.mapValue.fields);
//     arr.push(user._document.data.value.mapValue.fields);
//     })
// });
// console.log(arr);
// return arr;
// }
// async function getUserData(id){
//     const userRef = collection(db, "users");
//     return query(citiesRef, where("uid", "==", id));
//     // const docRef = doc(db, 'users', id);
//     // const docSnap = await getDoc(docRef);
//     // // console.log(docSnap.data());
//     // return docSnap.data()
// }

async function getUserData (id) {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
}

export { getUserData }