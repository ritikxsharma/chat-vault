const { ValidationFailedError, BadRequestError } = require("../errorHandling/errors")

const mobileNumberValidator = (req, res, next) =>{
    try {
        const mobileNumber = req.body.mobileNumber
        const isValidMobileNumber = /^[0-9]{10}$/
        
        if(!mobileNumber){
            throw new BadRequestError('No mobile number entered')
        }
        if(!isValidMobileNumber.test(mobileNumber)){
            throw new ValidationFailedError('Invalid Mobile Number')
        }

        // res.status(200).json({
        //         title: "Successfully validated.",
        //         message: "Mobile number OK"
        //     }
        // )
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = mobileNumberValidator