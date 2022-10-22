import { createContext, useState } from "react";

export const Authentication = createContext();

function AuthenticationProvider({children}) {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [sessionId, setSessionId] = useState();
    
    return (
        <Authentication.Provider value={{loggedIn, setLoggedIn, sessionId, setSessionId}}>
            {children}
        </Authentication.Provider>
    )
}

export default AuthenticationProvider