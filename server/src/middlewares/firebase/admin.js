const path = require('path')
const admin = require('firebase-admin')

const serviceAccountKeyPath = path.resolve(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountKeyPath))
})

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