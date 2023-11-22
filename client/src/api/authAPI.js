import {auth_axios} from "../axios/axios";
import axios from "axios";
export const loginRequest = async(loginCredentials) =>{
  try {
    const response = await auth_axios.post('/login', loginCredentials)
    if(response.status === 200) return response.data
  } catch (error) {
    return{
      error: error.response.data
    }    
  }
}

export const registerRequest = async(registerCredentials) =>{
  try {
      const response = await auth_axios.post('/register', registerCredentials)
      return response
  } catch (error) {
      return{
        error: error.response.data
      }   
  }
}

export const countryCodes = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data
  } catch (error) {
    throw new Error(error)
  }
};
  
