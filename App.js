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


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home(){
    return(
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
    )
}

export default function App() {
  return (
      //
      //   {/*<Login/>*/}
      //   <PostItem data={{imageUrl:"https://images.unsplash.com/photo-1659269661337-7ee76a7645b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      //                   description:"akfjkjf"}} />
      //
      <AppContext>
            <NavigationContainer>
                <StatusBar style='inverted'/>
                <Stack.Navigator initialRouteName='Home'>
                    {/*<Stack.Screen name='Posts' component={Posts}/>*/}
                    <Stack.Screen name='PostDetail' component={PostDetail}/>
                    {/*<Stack.Screen name='Profile' component={Profile} />*/}
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
                    {/*<Stack.Screen name='PostForm' component={PostForm}/>*/}
                    <Stack.Screen
                        name='Home'
                        component={Home}
                        options={({route})=>({
                            headerTitle:
                            getFocusedRouteNameFromRoute(route)
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
      </AppContext>

  );
}


