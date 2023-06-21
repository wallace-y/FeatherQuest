import dayjs from "dayjs";
import { db } from "../../firebaseConfig";
import { UserContext } from "../../utils/UserContext";
import { useEffect, useState, useContext } from "react";
import { styles, textStyles, buttonStyle } from "../../styles/style.js";
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import {
    doc,
    deleteDoc,

} from "firebase/firestore";

import LikeDislikeCard from "./LikeDislike";

export default CommentCard = ( { comment } ) => {

    const { globalUser, setGlobalUser } = useContext(UserContext);
    const [loadingDeleteComment, setLoadingDeleteComment] = useState(false);
  const [votes, setVotes] = useState(+comment.upvotes);
    

    const deleteComment = async (comment_id) => {
        try {
          setLoadingDeleteComment(true);
          await deleteDoc(doc(db, "comments", comment_id));
        } catch (error) {
          alert("There was an deleting your comment. Please try again later.");
          console.log(error.message);
        } finally {
          setLoadingDeleteComment(false);
        }
    };

    return (
        <View style={styles.containerFilledDark}>

            {/* Top bar */}
            <View style={textStyles.textContainerHorizontalDark}>
                <View style={[textStyles.textContainerHorizontalDark, {flex : 10}]}>
                    <Text style={textStyles.textEmphasizedLight}>{comment.user} </Text>
                    <View style={{flex: 1}}></View>
                    <Text style={textStyles.text}>{dayjs(comment.created_at).format("DD-MM-YYYY")} at {dayjs(comment.created_at).format("HH:mm:ss")}</Text>
                </View>
                <View style={styles.container}>
                    <Text>{votes}</Text>
                </View>
               
                {comment.user === globalUser.username ? ((
                    <View style={styles.containerRight}>
                        {loadingDeleteComment ? (
                            <View style={styles.container}>
                                <Text style={styles.loadingText}>Loading...Please Wait </Text>
                            </View>
                        ) : (
                            <TouchableOpacity style={buttonStyle.deleteButton} onPress={() => {deleteComment(comment.comment_id);}}>
                                <Text style={textStyles.buttonDeleteText}>X</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )) :  <LikeDislikeCard comment = {comment} votes={votes} setVotes={setVotes} />}
            </View>

            {/* Bottom bar */}
            <View style={styles.containerHorizontal}>
                <View style={[textStyles.textContainer, { flex: 3}]}>
                    <Text style={textStyles.textLeft}>{comment.body}</Text>
                </View> 

            </View>

        </View>
    )
}