import React from 'react'
import { createContext, useState, useEffect } from 'react'


// ====================================== Main AuthContext
const AuthContext = createContext()
export default AuthContext;


export const AuthProvider = ({children}) =>{

    const[spinner, setSpinner] = useState(false)
    const[user, setUser] = useState(()=> localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)

    let enterApp = async(e)=>{
        setSpinner(true)
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/email/auth/',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'email':e.target.email.value})
        })
        let data = await response.json()
        console.log(data)
        if(response.status===400){
            setSpinner(false)
        } else if(response.status===201 || response.status===302){
            localStorage.setItem('user', JSON.stringify(data))
            setUser(data)
            setSpinner(false)
        }
    }   
    
    let contextData = {
        enterApp:enterApp,
        user:user,
        spinner:spinner,
    }


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}