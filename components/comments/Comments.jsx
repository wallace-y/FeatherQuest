import { View } from "react-native";
import { styles } from "../../styles/style.js";

import PostComment from "./PostComment.jsx";
import CommentList from "./CommentList.jsx";

export default Comments = ({route}) => {

    return (
        <View style={styles.containerFilledDark}>
            <PostComment route={route}/>
            <CommentList route={route}/>
        </View>
    )
}