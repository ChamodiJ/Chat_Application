import { Children, createContext, useState } from "react";
import axios from 'axios';


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({Children})=>{
   
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser ,serAuthUser] = useState(null);
    const [onlineUsers, setOnlineUser] = useState([]);
    const [socket,setSocket] = useState(null);

// check if user is authenticated and if so , set the user data and connect the socket 


const checkAuth = async() => {
    try{
     const { data} =  await axios.get("/api/auth/chaek");
     if(data.success){
        setAuthUser(data.user)
     }
    }catch(error){

    }
}
    const value = {
       axios,
       authUser,
       onlineUsers,
       socket
    }

    return(
        <AuthContext.Provider value={value}>
            {Children}
        </AuthContext.Provider>
    )
}