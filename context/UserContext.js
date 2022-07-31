import {Constants} from "expo-constants";
import {createContext, useReducer} from "react";

const {apiUrl} = Constants.manifest.extra;

export const UserContext = createContext();

const initialState = {
    user:{
        token:''
    },
    loading:true,
    error:''
};

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER_TOKEN':
            return {
                ...state,
                user:{
                    ...state.user,
                    token:action.payload
                },
                error:''
            };
        case 'SET_USER_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'REMOVE_USER_TOKEN':
            return {
                ...state,
                user:{
                    ...state.user,
                    token:''
                },
            };
        default:
            return state;
    }
}

export const UserContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    async function login(username, password){
        try{
            const data = await fetch(
                `${apiUrl}/api/login?username=${username}&password=${password}`,
                {
                    method:'POST',
                }
            );
            const result = await data.json();
            
            if(result){
                dispatch({type:'SET_USER_TOKEN', payload:result.token})
            }
        }catch (e) {
            dispatch({type:'SET_USER_ERROR', payload: e.message})
        }
    }

    async function logout(){
        dispatch({type:'REMOVE_USER_TOKEN'});
    }

    return(
        <UserContextProvider value={{...state, login, logout}}>
            {children}
        </UserContextProvider>
    )
};

export default UserContext;