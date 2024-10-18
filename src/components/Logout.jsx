import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate = useNavigate()
    
    if(localStorage.token){
        localStorage.clear()
        navigate("/")
    }else{
        navigate("/")
    }
  return (
    <>
    {alert("not logged")}
    
    </>
  )
}
