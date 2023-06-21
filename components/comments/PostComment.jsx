import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import {
    addDoc,
    collection,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserContext } from "../../utils/UserContext";
import { useEffect, useState, useContext } from "react";
import { styles, textStyles } from "../../styles/style.js";

export default PostComment = ( { route } ) => {

    const { globalUser, setGlobalUser } = useContext(UserContext);
    const [loadingPostComment, setLoadingPostComment] = useState(false);
    const [newComment, setNewComment] = useState("");

    const { id } = route.params;

    const postComment = async () => {
        try {
          setLoadingPostComment(true);
          await addDoc(collection(db, "comments"), {
            body: newComment,
            created_at: new Date().toISOString(),
            sighting_id: id,
            upvotes: 0,
            user: globalUser.username,
          });
          setNewComment("");
        } catch (error) {
          alert("There was an error posting your comment. Please try again later.");
          console.log(error.message);
        } finally {
          setLoadingPostComment(false);
        }
    };

    return (
        <View style={styles.containerFilledLight}>
            {loadingPostComment ? (
                <View style={textStyles.container}>
                    <Text style={textStyles.loadingText}>Loading...Please Wait</Text>
                </View>
            ) : (
                <View style={textStyles.textContainerHorizontal}>
                    <TextInput
                    placeholder="Post a comment"
                    value={newComment}
                    onChangeText={(text) => setNewComment(text)}
                    multiline={true}
                    numberOfLines={4}
                    maxLength={140}
                    style={[styles.input, {flex : 4}]}
                    />
                    <View style={{flex: 0.1}}></View>
                    <TouchableOpacity onPress={postComment} style={styles.containerFilledLight}>
                        <Text style={textStyles.buttonText}>Post</Text>
                    </TouchableOpacity>
            </View>
            )}
        </View>
    )
}