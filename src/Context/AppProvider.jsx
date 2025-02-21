import React, { createContext, useState ,useEffect} from "react";
// export const AppContext=createContext()

// context instance
export const AppContext = createContext()

// context provider
function AppProvider(props) {
    const [isLogin, setIsLogin] = useState(false)
    const [token, setToken] = useState(false)



    useEffect(() => {
        // fetch user details from server and update state
        // if token exists in local storage, set isLogin to true
        // if token does not exist, set isLogin to false
        if(sessionStorage.getItem("token")){
            setToken(sessionStorage.getItem("token"))
            setIsLogin(true)
        }
        
    },[token,isLogin])

    return (
        <AppContext.Provider value={{isLogin, setIsLogin, token, setToken}}>
            {
                props.children
            }
        </AppContext.Provider>
    )
}

export default AppProvider