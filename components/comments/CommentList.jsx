import dayjs from "dayjs";
import { db } from "../../firebaseConfig";
import { UserContext } from "../../utils/UserContext";
import { useEffect, useState, useContext } from "react";
import { styles, textStyles } from "../../styles/style.js";
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import {
    doc,
    query,
    where,
    addDoc,
    orderBy,
    getDocs,
    deleteDoc,
    collection,
    onSnapshot,
} from "firebase/firestore";

import LikeDislikeCard from "./LikeDislike";
import CommentCard from "./CommentCard.jsx";


export default CommentList = ( { route }) => {

    const [allComments, setAllComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [error, setError] = useState(null);

    const { id } = route.params;

    useEffect(() => {
        try {
            setLoadingComments(true);
            const q = query(
                collection(db, "comments"),
                where("sighting_id", "==", id),
                orderBy("created_at", "desc")
            );
            onSnapshot(q, (querySnapshot) => {
                const comments = [];
                querySnapshot.forEach((doc) => {
                    comments.push({ comment_id: doc.id, ...doc.data() });
                });
                setAllComments(comments);
            });
        } catch (error) {
            console.log(error.message);
            setError("Failed to fetch comments data. Please try again later.");
        } finally {
            setLoadingComments(false);
        }
    }, []);

   
    // If no comments done render
    return (
        <View style={styles.containerFilledLight}>
            {loadingComments && (
                <View style={styles.container}>
                    <Text style={textStyles.loadingText}>Loading...Please Wait</Text>
                </View>
            )}
            {allComments.map((comment, index) => (
                <CommentCard comment={comment} key={index}/>
            ))}

        </View>
    )
}