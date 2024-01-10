import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const StateContext = createContext({
    currentUser : null,
    setCurrentUser: ()=>{},
    token : null,
    setToken: ()=>{}
});

export const StateContextProvider= ({children})=>{
    const [currentUser,setCurrentUser] = useState(null);
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN')??null);
    // const [products,setProducts] = useState([]);

    const setToken= (token)=>{
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
            _setToken(token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
            _setToken(token)
        }
    }

    useEffect(()=>{
        if(token){
            api.get('/user').then(({ data }) => setCurrentUser(data));
        }
    },[token])

    const data = {currentUser,setCurrentUser,token,setToken}
    return (
    <StateContext.Provider value={data}>
        {children}
    </StateContext.Provider>
    )
};

export const useStateContext = ()=>useContext(StateContext);

