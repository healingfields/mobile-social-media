import {Dimensions, Image, StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-start",
        backgroundColor:"white",
        borderTopWidth:1,
        borderColor:'orange',
        marginBottom:'5%'
    },
    thumbnail:{
        width: Dimensions.get('window').width * 0.95,
        height: Dimensions.get('window').width * 0.95,
        margin: '5%',

    },
    details:{
        width:'95%',
        margin: '5%',
    },
    description:{
        fontSize:20,
        fontWeight:"bold",
        color:'gray'
    }
})
const PostItem = ({data}) => {
    return(
        <View style={styles.container}>
            <Image source={{uri:data.imageUrl}} style={styles.thumbnail}/>
            <View style={styles.details}>
                <Text style={styles.description}>{data.description}</Text>
            </View>
        </View>
    )
}

export default PostItem;
