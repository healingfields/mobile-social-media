import {useContext, useEffect} from "react";
import {PostsContext} from "../context/PostsContext";
import {useRoute} from "@react-navigation/native";
import PostItem from "../components/PostItem";
import {StyleSheet, View, Text} from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        display:"flex",
        justifyContent:"flex-start",

    },
    message:{
        fontSize:20,
        color:'red'
    }
})
const PostDetail = () => {
    const route = useRoute();
    const {postId} = route.params
    console.log(postId)
    const {error, loading, post, fetchPost} = useContext(PostsContext);

    useEffect(()=>{
        postId &&  fetchPost(postId);

    },[postId])

    return(
        <View style={styles.container}>
            {loading || error ?(
                <Text style={styles.message}>{error || 'loading ...'}</Text>
            ):(
                post && <PostItem data={post}/>
            )}
        </View>
    )
}
export default PostDetail;