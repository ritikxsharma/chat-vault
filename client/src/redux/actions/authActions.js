import {
    signInWithPhoneNumber
} from 'firebase/auth'

const authActions = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE'
}

const handle_login_request = (user) =>{
    return {
        type: authActions.LOGIN_REQUEST,
        payload: user
    }
}

const handle_login_success = (user) =>{
    return {
        type: authActions.LOGIN_SUCCESS,
        payload: user
    }
}

const handle_login_failure = (error) =>{
    return {
        type: authActions.LOGIN_FAILURE,
        error: error
    }
}

const handle_send_otp = async(auth, credentials, recaptchaVerifier) =>{
    try {
        const phoneNumber = `${credentials.countryCode}${credentials.mobileNumber}`
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
        return confirmationResult
    } catch (error) {
        throw error
    }

}

const handle_verify_otp = async(confirmationResult, otp) => {
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

export {
    authActions,
    handle_login_request,
    handle_login_success,
    handle_login_failure,
    handle_send_otp,
    handle_verify_otp
}


