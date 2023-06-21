import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../utils/UserContext";

import {
  upVoteComment,
  removeVoteComment,
} from "../utils/updateVote";

export default LikeDislikeCard = ({ route, navigation, comment }) => {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [votes, setVotes] = useState(+comment.upvotes);
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
