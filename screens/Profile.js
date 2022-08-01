import {useContext} from "react";
import UserContext from "../context/UserContext";
import Button from "../components/Button";
import {StyleSheet, View} from "react-native";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:'white',
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-start",
        paddingTop:40
    },
    avatar:{
        width:300,
        height:300,
        borderWidth:1,
        borderRadius:5,
        borderColor:'darkgray',
        marginBottom:40
    }
})

const Profile = () => {
    const {logout} = useContext(UserContext);

    return(
        <View style={styles.container}>
            <LottieView autoPlay
                        source={require('../assets/avatar.json')}
                        style={styles.avatar}/>
            <Button
                onPress={()=>logout()}
                label='Logout'
                color='orange'
            />
        </View>
    )
}
export default Profile;