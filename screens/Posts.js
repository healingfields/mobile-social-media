import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useContext, useEffect} from "react";
import {PostsContext} from "../context/PostsContext";
import PostItem from "../components/PostItem";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    message:{
        color:'red',
        fontSize:20
    },

})
export default function Posts(){

    const navigation = useNavigation();

    const {loading, error, posts, fetchPosts} = useContext(PostsContext);

    useEffect(()=>{
        (!posts || !posts.length) && fetchPosts();
        console.log(loading);
    }, [posts, fetchPosts])

    return(
        <ScrollView style={styles.container}>
            {loading || error ? (
                <Text style={styles.message}>{error || 'Loading...'}</Text>
            ):(
                posts &&
                    posts.map((post)=>(
                        <TouchableOpacity
                            key={post.id}
                            onPress={()=>{
                                navigation.navigate('PostDetail', {postId:post.id})
                            }}
                        >
                                <PostItem key={post.id} data={post}/>
                        </TouchableOpacity>
                    ))
            )}
        </ScrollView>
    )
}