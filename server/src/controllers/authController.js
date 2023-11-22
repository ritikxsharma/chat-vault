const {
    NotFoundError, BadRequestError
} = require('../middlewares/errorHandling/errors')
const {
    isExsistingUser,
    createNewUser,
} = require('../middlewares/firebase/admin')

const login = async(req, res, next) =>{
    try {
        const{ countryCode, mobileNumber } = req.body
        const phoneNumber = `${countryCode}${mobileNumber}`
        const existingUser = await isExsistingUser(phoneNumber)

        if(existingUser === 'auth/user-not-found'){
            throw new NotFoundError('User Not Found')
        }

        res.status(200).json(
            {
                message: "User Exists",
                user: existingUser
            }
        )
        
    } catch (error) {
        next(error)
    }
}

const register = async(req, res, next) =>{
    try {
        const{ countryCode, mobileNumber } = req.body
        const phoneNumber = `${countryCode}${mobileNumber}`
        const existingUser = await isExsistingUser(phoneNumber)
        if(!existingUser){
            throw new BadRequestError('user already exists')
        }

        const newUser = await createNewUser({phoneNumber})
        
        res.status(200).json(
            {
                message: "New User Created",
                user: newUser
            }
        )
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    register
}