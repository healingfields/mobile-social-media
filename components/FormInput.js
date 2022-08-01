import {StyleSheet, TextInput} from "react-native";

const styles = StyleSheet.create({
    input:{
        width:'100%',
        padding:20,
        display:"flex",
        alignItems:"center",
        justifyContent:"space-around",
        borderRadius:5,
        borderWidth:1,
        borderColor:"black",
        backgroundColor:"white",
        fontSize:20,
        marginBottom:20,
    }
})
export default function FormInput({onChange, ...props}){
    return(
    <TextInput
        style={styles.input}
        onChangeText={(text)=>{onChange(text)}}
        {...props}
        />
    );
}