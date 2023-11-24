import React, { useState } from 'react'
import Loader from '../loading/Loader'
import { registerRequest } from '../../api/authAPI'
import CountrySelect from './CountrySelect'

const Register = ({handleAuthChange}) => {

  const [credentials, setCredentials] = useState({
    countryCode: '+91',
    mobileNumber: ''
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) =>{
    const{
      name,
      value
    } = e.target
    
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const handleRegister = async() =>{
      try {
        setMessage('')
        setIsLoading(true)
        const response = await registerRequest(credentials)
        if(!response.error){
          setMessage(response.message)
          setTimeout(()=>{
            handleAuthChange('LOGIN')
          }, 2000)
        }
        else{
          setMessage(response.error.message)
        }
      } catch (error) {
        setMessage('Error Occurred')
      } finally{
        setIsLoading(false)
      }
  }

return (
    <div className='auth-container'>
        <div className="heading">
          REGISTER PAGE
        </div>
        <div className="input-container">
          <div className="country-dropdown">
            <CountrySelect
                selectedCountry = {credentials.countryCode}
                onCountryChange = {(selectedCountry) => setCredentials({...credentials, countryCode: selectedCountry})}
            ></CountrySelect>
          </div>
          <div className="input-box">
            <input 
              type="text"
              name='mobileNumber'
              placeholder='Enter mobile number'
              value={credentials.mobileNumber}
              onChange={handleInputChange}
              required
              />
          </div>
        </div>

        {
          message !== '' && (
            <div className="message">
              {message}
            </div>
          )
        }

        <div id="recaptcha-container"></div>

        <button onClick={handleRegister}>
          {
            isLoading ? (
              <Loader type={'spinner'}></Loader>
            ) : (
              'Register'
            )
          }
        </button>

        <div className="auth-type">
            <p>
                New User?
                <a onClick={() => handleAuthChange('LOGIN')}>
                    login
                </a>
            </p>
        </div>

      </div>
  )
}

export default Register