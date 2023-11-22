
const admin = require('firebase-admin')

const serviceAccount = require('../../../firebase-keys/ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const isExsistingUser = async(mobileNumber) =>{
    try {
        const result =  await admin.auth().getUserByPhoneNumber(mobileNumber)
        return result
    } catch (error) {
        return error.code
    }
}

const createNewUser = async(mobileNumber) =>{
    return await admin.auth().createUser(mobileNumber);
}

module.exports = {
    isExsistingUser,
    createNewUser
}