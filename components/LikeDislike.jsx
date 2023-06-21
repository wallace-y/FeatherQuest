import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Box,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
  getDocs,
  deleteDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { set } from "react-hook-form";
import {
  upVoteComment,
  downVoteComment,
  removeVoteComment,
} from "../utils/updateVote";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default LikeDislikeCard = ({ route, navigation, comment }) => {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [votes, setVotes] = useState(+comment.upvotes);
  const [updateVotes, setUpdateVotes] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const amendVote = (changeVotes) => {};

  const upVote = () => {
    if (hasVoted) {
      removeVoteComment(globalUser.userId, comment.comment_id, votes - 1);
      setVotes(votes - 1);
    } else {
      upVoteComment(globalUser.userId, comment.comment_id, votes + 1);
      setVotes(votes + 1);
    }
    setHasVoted(!hasVoted);
  };
  useEffect(() => {
    if (comment.Vote_list && comment.Vote_list.includes(globalUser.userId)) {
      setHasVoted(true);
    } else {
      setHasVoted(false);
    }
  }, [globalUser]);

  return (
    <View>
      <Text>{votes}Chirps</Text>
      <TouchableOpacity
        onPress={() => {
          upVote();
        }}
      >
        <Text style={styles.voteButton}>
          {hasVoted ? "Chirped!" : "Upvote!"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  deleteButton: {
    fontFamily: "Virgil",
    color: "white",
    backgroundColor: "#A18276",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    width: "33%",
    alignSelf: "flex-end",
  },
  voteButton: {
    fontFamily: "Virgil",
    color: "white",
    backgroundColor: "#736372",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    width: "33%",
    alignSelf: "flex-end",
  },
});
