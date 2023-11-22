const error_codes = {
    BAD_REQUEST: 400,
    VALIDATION_FAILED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.error_code = error_codes.BAD_REQUEST
    }
}

class ValidationFailedError extends Error{
    constructor(message){
        super(message)
        this.error_code = error_codes.VALIDATION_FAILED
    }
}

class ForbiddenError extends Error{
    constructor(message){
        super(message)
        this.error_code = error_codes.FORBIDDEN
    }
}

class NotFoundError extends Error{
    constructor(message){
        super(message)
        this.error_code = error_codes.NOT_FOUND
    }
}

class InternalServerError extends Error{
    constructor(message){
        super(message)
        this.error_code = error_codes.INTERNAL_SERVER_ERROR
    }
}

module.exports = {
    BadRequestError,
    ValidationFailedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError
}