import React, { useState, useEffect } from 'react'
import {loginRequest } from '../../api/authAPI'
import Loader from '../loading/Loader'
import { handle_login_failure, handle_login_request, handle_send_otp, login_request, sendOTP } from '../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import { RecaptchaVerifier } from 'firebase/auth'
import auth from '../../firebase/admin'
import CountrySelect from './CountrySelect'


const Login = ({handleAuthChange, handleConfirmationResult}) => {
    const [credentials, setCredentials] = useState({
      countryCode: '+91',
      mobileNumber: ''
    })
    const [error, setError] = useState('')
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
      const captcha = new RecaptchaVerifier(auth, 'recaptcha-container',{
        'size': 'invisible'
      })

      captcha.render().then(() => {
        setRecaptchaVerifier(captcha);
      });

    }, [])

    const handleLogin = async() =>{
      setError('')
      if(!recaptchaVerifier){
        setError('Please complete recaptcha')
        return
      }

      try {
        
        setIsLoading(true)
        const response = await loginRequest(credentials);
        if(!response.error){
          // await handle_send_otp(auth, credentials, recaptchaVerifier)
          // .then((result)=>{
          //   dispatch(handle_login_request(response.user))
          //   handleConfirmationResult(result)
          // }) 
          // .catch((error) =>{
          //   console.log(error.code);
          //   setError(error.code)
          // })
          console.log('OTP SENT');
        }

        else{
          console.log('error');
        }

      } catch (error) {
        console.log(`Error --> ${error}`);
        dispatch(handle_login_failure('Error occurred'))
        setError('Error occurred')
      } finally{
        setIsLoading(false)
      }
    }

  return (
    <div className='auth-container'>
      <div className="heading">
        LOGIN PAGE
      </div>
      <div className="input-container">
        <div className="country-dropdown">
          <CountrySelect
            selectedCountry = {credentials.countryCode}
            onCountryChange = {(selectedCountry) => setCredentials({...credentials, countryCode: selectedCountry})}
          />
        </div>
        <div className="input-box">
          <input 
            type="text"
            name='mobileNumber'
            placeholder='Enter mobile number'
            value={credentials.mobileNumber}
            onChange={(e) => setCredentials({...credentials, mobileNumber: e.target.value})}
          />
        </div>
      </div>

      {
        error !== '' && (
          <div className="error-message">
            {error}
          </div>
        )
      }

      <div id="recaptcha-container"></div>

      <button onClick={handleLogin}>
        {
          isLoading ? (
            <Loader type={"spinner"}></Loader>
          ) : (
            "login"
          )
        }
      </button>

      <div className="auth-type">
          <p>
              New User?
              <a onClick={() => handleAuthChange('REGISTER')}>
                  register
              </a>
          </p>
      </div>
    </div>
  )
}

export default Login