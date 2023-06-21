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
import LikeCard from "./LikeCard";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default Sighting = ({ route, navigation }) => {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const {
    id,
    bird,
    sighting_img_url,
    coordinates,
    date_spotted,
    rarity,
    user,
    created_at,
  } = route.params;
  const [allComments, setAllComments] = useState([]);
  const [error, setError] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingPostComment, setLoadingPostComment] = useState(false);
  const [loadingDeleteComment, setLoadingDeleteComment] = useState(false);
  const dateDay = dayjs(date_spotted).format("DD-MM-YYYY");
  const dateTime = dayjs(date_spotted).format("HH:mm:ss");
  const [newComment, setNewComment] = useState("");
  const [birdDetails, setBirdDetails] = useState(null);

  useEffect(() => {
    const fetchBirdDetails = async () => {
      try {
        const birdQuery = query(
          collection(db, "birds"),
          where("common_name", "==", bird)
        );
        const birdQuerySnapshot = await getDocs(birdQuery);
        if (!birdQuerySnapshot.empty) {
          const birdDoc = birdQuerySnapshot.docs[0];
          const birdData = birdDoc.data();
          setBirdDetails(birdData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBirdDetails();
  }, [bird]);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        setLoadingComments(true);

        const q = query(
          collection(db, "comments"),
          where("sighting_id", "==", id),
          orderBy("created_at", "desc")
        );

        const commentsData = onSnapshot(q, (querySnapshot) => {
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
    };

    fetchAllComments();
  }, []);

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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.birdName}>{bird}</Text>
        <Image
          source={{
            uri: sighting_img_url,
          }}
          style={styles.image}
        />
        <Text style={styles.birdInfo}>
          Date Spotted: {dateDay} at {dateTime}
        </Text>
        <Text style={styles.birdInfo}>
          Location of Sighting:{" "}
          {coordinates.coordinates.map((point) => `${point}, `)}
        </Text>
        <Text style={styles.birdInfo}>Rarity: {rarity} </Text>
        <Text style={styles.birdInfo}>Spotted by: {user}</Text>
        {birdDetails && (
          <Text style={styles.birdInfo}>
            Details: {birdDetails.description}
          </Text>
        )}
        {loadingPostComment ? (
          <View style={styles.loadingTextContainer}>
            <Text style={styles.loadingText}>Loading...Please Wait</Text>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              placeholder="Post a comment"
              value={newComment}
              onChangeText={(text) => setNewComment(text)}
              style={styles.input}
              multiline={true}
              numberOfLines={4}
              rows={4}
            />
            <TouchableOpacity onPress={postComment}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.commentContainer}>
          {loadingComments && (
            <View style={styles.loadingTextContainer}>
              <Text style={styles.loadingText}>Loading...Please Wait</Text>
            </View>
          )}
          {allComments.map((comment, index) => (
            <View key={index} style={styles.commentCard}>
              <View style={styles.commentTitle}>
                <Text style={styles.userName}>{comment.user} </Text>
                <Text style={styles.commentDate}>
                  {dayjs(comment.created_at).format("DD-MM-YYYY")} at{" "}
                  {dayjs(comment.created_at).format("HH:mm:ss")}
                </Text>
              </View>
              <Text>{comment.body}</Text>

              <LikeCard comment={comment} />
              {comment.user === globalUser.username ? (
                loadingDeleteComment ? (
                  <View style={styles.loadingTextContainer}>
                    <Text style={styles.loadingText}>
                      Loading...Please Wait
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    comment_id={comment.comment_id}
                    onPress={() => {
                      deleteComment(comment.comment_id);
                    }}
                  >
                    <Text style={styles.deleteButton}>Delete</Text>
                  </TouchableOpacity>
                )
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    minHeight: height,
    backgroundColor: "#7A918D",
  },
  container: {
    flex: 1,
    backgroundColor: "#7A918D",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width * 0.8,
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 40,
  },
  birdCard: {
    marginBottom: 20,
  },
  birdName: {
    fontFamily: "Virgil",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 5,
  },
  birdInfo: {
    fontFamily: "Virgil",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 5,
  },
  inputContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  input: {
    flex: 1,
    fontFamily: "Virgil",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonText: {
    fontFamily: "Virgil",
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 15,
    paddingVertical: 35,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  commentContainer: {
    marginTop: 10,
    marginBottom: 100,
    width: "80%",
  },
  commentTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  commentDate: {
    fontFamily: "Virgil",
    textAlign: "right",
    fontSize: 10,
    paddingTop: 10,
  },
  userName: {
    fontFamily: "Virgil",
    textAlign: "left",
    fontSize: 20,
  },
  commentCard: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#324d32",
  },
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
  loadingTextContainer: {
    backgroundColor: "#A18276",
    width: "80%",
    textAlign: "center",
  },
  loadingText: {
    fontFamily: "Virgil",
  },
});
