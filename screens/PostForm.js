import {useContext, useState} from "react";
import PostsContext from "../context/PostsContext";
import {useNavigation} from "@react-navigation/native";
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:'grey',
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    form:{
        width:'90%'
    },
    imageButton:{
        width:'100%',
        height:'50%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc',
        backgroundColor:'#f0f0f0',
        marginBottom:20,
        display:"flex",
        alignItems:'center',
        justifyContent:"center"
    },
    imageButtonText:{
        fontSize:40,
        color:"#ccc"
    }
})

export default function PostForm(){
    const {addPost} = useContext(PostsContext);
    const navigation = useNavigation();

    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding':'height'}
            style={styles.container}>
            <View style={styles.form}>
            <TouchableOpacity style={styles.imageButton}>
                <Text style={styles.imageButtonText}>+</Text>
            </TouchableOpacity>
            <FormInput
                onchange={setDescription}
                value={description}
                placeholder='Description'
                textContentType='none'
            />
            <Button
                onPress={()=>{
                    if(imageUrl.length && description.length){
                        addPost(description, imageUrl);
                        navigation.navigate('Posts');
                    }
                }}
                label='Add Post'
            />
            </View>
        </KeyboardAvoidingView>
    )
}