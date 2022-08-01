import {UserContextProvider} from "./UserContext";
import {PostsContextProvider} from "./PostsContext";

const AppContext = ({children}) => {
    return(
        <UserContextProvider>
            <PostsContextProvider>
                {children}
            </PostsContextProvider>
        </UserContextProvider>
    )
}
export default AppContext;
