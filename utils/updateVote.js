import {
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const upVoteComment = async (userId, commentId, voteCount) => {
  const commentRef = doc(db, "comments", commentId);
  try {
    await updateDoc(commentRef, {
      Vote_list: arrayUnion(userId),
      upvotes: voteCount,
    });
  } catch (error) {
    console.log("error in chirp util", error);
  }
};

const removeVoteComment = async (userId, commentId, voteCount) => {
  const commentRef = doc(db, "comments", commentId);
  try {
    await updateDoc(commentRef, {
      Vote_list: arrayRemove(userId),
      upvotes: voteCount,
    });
  } catch (error) {
    console.log("error in chirp util", error);
  }
};

export { upVoteComment, removeVoteComment };
