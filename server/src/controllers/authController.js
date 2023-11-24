const {
    NotFoundError, BadRequestError, InternalServerError
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

        switch(existingUser.code){
            case 'auth/user-not-found':
                throw new NotFoundError('User not found')
            
            case 'auth/user-exists':{
                res.status(200).json({
                    message: 'user exists',
                    user: existingUser
                })
            }
            default:
                throw new InternalServerError('Internal Server Error')
        }
        
    } catch (error) {
        next(error)
    }
}

const register = async(req, res, next) =>{
    try {
        const{ countryCode, mobileNumber } = req.body
        const phoneNumber = `${countryCode}${mobileNumber}`
        const existingUser = await isExsistingUser(phoneNumber)

        switch(existingUser.code){
            case 'auth/user-exists':
                throw new BadRequestError('user already exists')
            
            case 'auth/user-not-found':{
                const newUser = await createNewUser({phoneNumber})
                res.status(201).json({
                    message: 'User registered successfully',
                    user: newUser
                })
            }

            default:
                throw new InternalServerError('Internal Server Error')
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    register
}