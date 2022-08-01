import { StatusBar } from 'expo-status-bar';
import Login from "./screens/Login";
import Posts from "./screens/Posts";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import PostDetail from "./screens/PostDetail";
import AppContext from "./context/AppContext";

export default function App() {

    const Stack = createNativeStackNavigator();
  return (
      //
      //   {/*<Login/>*/}
      //   <PostItem data={{imageUrl:"https://images.unsplash.com/photo-1659269661337-7ee76a7645b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      //                   description:"akfjkjf"}} />
      //
      <AppContext>
            <NavigationContainer>
                <StatusBar style='auto'/>
                <Stack.Navigator initialRuteName='Posts'>
                    <Stack.Screen name='Posts' component={Posts}/>
                    <Stack.Screen name='PostDetail' component={PostDetail}/>
                    <Stack.Screen name='Login' component={Login}/>
                </Stack.Navigator>
            </NavigationContainer>
      </AppContext>

  );
}


