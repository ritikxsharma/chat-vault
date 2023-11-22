import '../styles/auth/_Auth.scss'
import React, { useState } from 'react'
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import VerifyOTP from '../components/auth/VerifyOTP';

const Auth = () => {

    const [authType, setAuthType] = useState('LOGIN')
    const [confirmationResult, setConfirmationResult] = useState(null)

    const handleAuthChange = (auth) =>{
      setAuthType(auth)
    }

    const handleConfirmationResult = (result) =>{
      setConfirmationResult(result)
      setAuthType("VERIFY-OTP")
    }

    const renderAuthComponent = () =>{
      switch(authType){
        case 'LOGIN':
          return <Login handleAuthChange={handleAuthChange} handleConfirmationResult={handleConfirmationResult}></Login>
        
        case 'REGISTER':
          return <Register handleAuthChange={handleAuthChange}></Register>
        
        case 'VERIFY-OTP':
          return <VerifyOTP confirmationResult={confirmationResult}></VerifyOTP>
        
        default:
          return null
      }
    }


  return (
    <div className="auth-page">
      {
        renderAuthComponent()
      }
    </div>
  )
}

export default Auth