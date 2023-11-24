const admin = require('firebase-admin')

admin.initializeApp()

const isExsistingUser = async(mobileNumber) =>{
    try {
        const user =  await admin.auth().getUserByPhoneNumber(mobileNumber)
        return {
            code: 'auth/user-exists',
            user: user
        }
    } catch (error) {
        return error
    }
}

const createNewUser = async(mobileNumber) =>{
    return await admin.auth().createUser(mobileNumber);
}

module.exports = {
    isExsistingUser,
    createNewUser
}