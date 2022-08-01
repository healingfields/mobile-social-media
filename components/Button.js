import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const styles = StyleSheet.create({
    button:{
        width:'100%',
        padding:20,
        borderRadius:5,
        backgroundColor:'blue'
    },
    buttonText:{
        fontSize:20,
        textAlign:"center",
        color:'white'
    }
})
const Button = ({onPress, label, color}) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, {backgroundColor:color}]}>
                <Text style={styles.buttonText}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default Button;