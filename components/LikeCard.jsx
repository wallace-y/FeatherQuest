import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../utils/UserContext";

import { upVoteComment, removeVoteComment } from "../utils/updateVote";

export default LikeCard = ({ route, navigation, comment }) => {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

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
    setVotes(+comment.upvotes);

    if (comment.Vote_list && comment.Vote_list.includes(globalUser.userId)) {
      setHasVoted(true);
    } else {
      setHasVoted(false);
    }
  }, [globalUser, comment.upvotes]);

  return (
    <View>
      <Text style={styles.votes}>
        {votes}{" "}
        <Image source={require("../assets/chirps.png")} style={styles.image} />
      </Text>

      <TouchableOpacity
        onPress={() => {
          upVote();
        }}
      >
        <Text style={styles.voteButton}>
          {hasVoted ? "Chirped!" : "Chirp!"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
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
  image: {
    display: "flex",
    flexDirection: "row",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  votes: {
    fontSize: 20,
    alignItems: "center",
  },
});
