import {useContext, useState} from "react";
import UserContext from "../context/UserContext";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FormInput from "../components/FormInput";

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:'white',
        display:"flex",
        alignItems:"center",
        paddingVertical:20,
    },
    message:{
        fontSize:20,
        color:'red',
        marginBottom:20
    },
    button:{
        width:250,
        borderRadius:5,
        backgroundColor:'blue',
        padding:15
    },
    buttonText:{
        fontSize:20,
        color:'white',
        textAlign:"center"
    }

})

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const {error, login} = useContext(UserContext);

    return(
        <View style={styles.container}>
            {error? <Text style={styles.message}>Something went worng</Text>: null}
            <FormInput
                onChangetext = {setUsername}
                value = {username}
                placeholder = 'Your Username'
                textContentType = 'username'
            />
            <FormInput
                onChangetext = {setPassword}
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