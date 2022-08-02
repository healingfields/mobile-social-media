import {useContext, useEffect, useState} from "react";
import UserContext from "../context/UserContext";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FormInput from "../components/FormInput";
import LottieView from "lottie-react-native";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        paddingHorizontal:'10%',
        backgroundColor:'white',
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    message:{
        fontSize:20,
        color:'red',
        marginBottom:20
    },
    button:{
        width:200,
        borderRadius:5,
        backgroundColor:'#76BA99',
        padding:15,
        marginTop:10
    },
    buttonText:{
        fontSize:20,
        color:'gray',
        textAlign:"center"
    },
    avatar:{
        height:200,
        width:200
    }

})

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const {error, user, login} = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        if(user.token){
            navigation.navigate('Home');
        }
    }, [user.token])

    return(
        <View style={styles.container}>
            {error? <Text style={styles.message}>{error}</Text>: null}
            <LottieView autoPlay loop source={require('../assets/welcome.json')} style={styles.avatar}/>
            <FormInput
                onChange = {setUsername}
                value = {username}
                placeholder = 'Your Username'
                textContentType = 'username'
            />
            <FormInput
                onChange = {setPassword}
                value = {password}
                placeholder = 'Your password'
                textContentType = 'password'
                secureTextEntry
            />
            <TouchableOpacity onPress={()=>login(username, password)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}