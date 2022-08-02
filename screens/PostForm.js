import {useContext, useState} from "react";
import PostsContext from "../context/PostsContext";
import {useNavigation} from "@react-navigation/native";
import {Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import * as ImagePicker from 'expo-image-picker'
import {useActionSheet} from "@expo/react-native-action-sheet";

export default function PostForm(){
    const {addPost} = useContext(PostsContext);
    const navigation = useNavigation();
    const {showActionSheetWithOptions} = useActionSheet();

    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    console.log(imageUrl)

    async function uploadImage(){
        const {status} = await ImagePicker
            .requestMediaLibraryPermissionsAsync();
        if(status!=='granted'){
            Alert.alert('sorry we need camera permissionsto upload image');
        }else{
            const result =
                await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing:true,
                    aspect: [4,3],
                    quality:1
                })
            if(!result.cancelled){
                console.log(result.uri);
                setImageUrl(result.uri);
            }
        }
    }

    async function takePicture(){
        const {status} = await
            ImagePicker.requestCameraPermissionsAsync();

        if(status!=='granted'){
            Alert.alert('we need camera permission to make this work')
        }else{
            const result =
                await ImagePicker.launchCameraAsync({
                    mediaTypes:ImagePicker.MediaTypeOptions.All,
                    aspect:[4,3],
                    quality:1,
                })
            console.log(result.uri)
            if(!result.cancelled){
                setImageUrl(result.uri)
            }
        }
    }

    function openActionSheet(){
        const options = ['camera roll', 'camera', 'cancel']
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {options, cancelButtonIndex},
            (buttonIndex) => {
                if(buttonIndex === 0){
                    uploadImage();
                }
                if(buttonIndex===1){
                    takePicture();
                }
            }
        )
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding':'height'}
            style={styles.container}>
            <View style={styles.form}>
            <TouchableOpacity
                style={styles.imageButton}
                onPress={()=>openActionSheet()}>
                {imageUrl.length?(
                    <Image source={{uri:imageUrl}}
                           style={{width:'100%', height:'100%'}}
                           />
                ):(
                    <Text style={styles.imageButtonText}>+</Text>
                )}

            </TouchableOpacity>
            <FormInput
                onChange = {setDescription}
                value={description}
                placeholder='Description'
                textContentType='none'
            />
            <Button
                onPress={()=>{
                    if(imageUrl.length && description.length){
                        addPost(imageUrl, description);
                        navigation.navigate('Posts');
                        setImageUrl('');
                        setDescription('');
                    }
                }}
                label='Add Post'
            />
            </View>
        </KeyboardAvoidingView>
    )
}

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