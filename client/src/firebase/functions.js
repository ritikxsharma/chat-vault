import {
    signInWithPhoneNumber
} from 'firebase/auth'
import auth from '../firebase/admin'

export const sendOTP = async(credentials, recaptchaVerifier) =>{
    try {
        const phoneNumber = `${credentials.countryCode}${credentials.mobileNumber}`
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
        return confirmationResult
    } catch (error) {
        throw error
    }
}

export const verifyOTP = async(confirmationResult, otp) => {
    try {
        if(!confirmationResult){
            throw new Error('Confirmation Result not defined')
        }
        const user = await confirmationResult.confirm(otp)
        return user
    } catch (error) {
        throw error
    }
}

