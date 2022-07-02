import React, { createContext, useContext, useEffect, useState } from "react";
import { Context } from "react";
import { auth } from "../firebase";


export const AuthContext= React.createContext();

export function AuthProvider(children){
    // console.log(children.children);
    const [user,setUser]=useState();
    const [loading,setLoading]=useState(true);
    // console.log(loading);

    function login(email,password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut();
    }

    useEffect(()=>{
        const unsub=auth.onAuthStateChanged((user)=>{
            setUser(user)
            setLoading(!loading)
        })
        return ()=>{
            unsub();
        }
    },[])

    const store={
        login,
        user,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={store}>
            {!loading && children.children}
            {/* Here children.children is written cause in App.js children of AuthProvider is Routes but we need to render pages (<Login/> etc.) which is in route. route is children of routes thus here children.children is written*/}
        </AuthContext.Provider>
    )
}