import { createContext, useContext, useState } from "react";


export const AuthContex  = createContext();


// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContex = ()=>{
    return useContext(AuthContex);
}



// eslint-disable-next-line react/prop-types
export const AuthContexProvider = ({children})=>{
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("user-data" || null)));
    return <AuthContex.Provider value={{authUser,setAuthUser}}>{children}</AuthContex.Provider>
}