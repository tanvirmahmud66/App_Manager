import React, { useEffect } from 'react'
import checkLogo from '../assets/check.png'
import { useParams } from 'react-router-dom'

const Verified = () => {

    const{email} = useParams();
    useEffect(()=>{
        emailVerfied() 
    },[])

    const emailVerfied = async()=>{
        let response = await fetch(`http://127.0.0.1:8000/api/email/auth/`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'email':email})
        })

        if(response.status===200){
            console.log("verified")
        }else{
            console.log("error")
        }
    }

  return (
    <>   
    </>
  )
}

export default Verified