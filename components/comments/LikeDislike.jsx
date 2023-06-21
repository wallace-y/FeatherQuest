import {
  Text,
  View,
  Image,
  TouchableOpacity,
  
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { upVoteComment, removeVoteComment } from "../../utils/updateVote";
import { buttonStyle, styles, textStyles } from "../../styles/style.js";

export default LikeDislikeCard = ({ comment, votes, setVotes }) => {

  const { globalUser, setGlobalUser } = useContext(UserContext);
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
      <TouchableOpacity style={buttonStyle.voteButton} onPress={() => { upVote() }}>
        <Image style={[buttonStyle.voteButton, hasVoted ? {tintColor: "grey"} : {tintColor: "rgba(0,200,0,0.3)"}]} source={require("../../assets/chirps.png")}/>
      </TouchableOpacity>
  );
};