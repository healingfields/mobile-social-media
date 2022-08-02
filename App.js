import { StatusBar } from 'expo-status-bar';
import Login from "./screens/Login";
import Posts from "./screens/Posts";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer, getFocusedRouteNameFromRoute} from "@react-navigation/native";
import PostDetail from "./screens/PostDetail";
import AppContext from "./context/AppContext";
import Profile from "./screens/Profile";
import PostForm from "./screens/PostForm";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome} from '@expo/vector-icons';
import {useContext, useEffect} from "react";
import UserContext from "./context/UserContext";
import {navigationRef} from "./routing";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home(){
    return(
        <ActionSheetProvider>
        <Tab.Navigator
            screenOptions={({route})=>({
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({color, size})=>{
                    const iconName =
                        (route.name === 'Posts' && 'feed') ||
                        (route.name === 'PostForm' && 'plus-square') ||
                        (route.name === 'Profile' && 'user');

                    return <FontAwesome name={iconName} size={size} color={color}/>
                }

            })}>
            <Stack.Screen
                name='Posts'
                component={Posts}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name='Profile'
                component={Profile}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name='PostForm'
                component={PostForm}
                options={{
                    headerShown:false,
                    tabBarLabel : 'Add Post'}}
            />
        </Tab.Navigator>
        </ActionSheetProvider>
    )
}

function Navigator(){

    const {user, getToken} = useContext(UserContext);

    useEffect(()=>{
        getToken();
    },[])

    return(
        <NavigationContainer ref={navigationRef}>
            <StatusBar style='inverted'/>
            <Stack.Navigator initialRouteName={
                user.token.length? 'Home' : 'Login'
            }>
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={({route})=>({
                        headerTitle:getFocusedRouteNameFromRoute(route),
                    })}
                    />
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{
                        headerStyle:{
                            backgroundColor:'lightgrey',
                        },
                        headerTintColor:'gray',
                        headerTitleStyle:{
                            fontWeight:'bold',
                            color:'#76BA99'
                        }
                    }}
                />
                <Stack.Screen name='PostDetail' component={PostDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function App() {
  return (
      <AppContext>
            <Navigator/>
      </AppContext>

  );
}


