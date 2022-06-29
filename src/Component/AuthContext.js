import React, { createContext, useContext, useEffect, useState } from "react";
import { Context } from "react";
import { auth } from "../firebase";


export const AuthContext= React.createContext();

export function AuthProvider(children){
    console.log(children.children.props.children);
    // children=children.children.props.children;
    // children=children.props.children
    const [user,setUser]=useState();
    const [loading,setLoading]=useState(true);

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
            setLoading(false)
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
            {!loading && children.children.props.children}
        </AuthContext.Provider>
    )
}