const errorHandler = (err, req, res, next) =>{
    console.log(err.error_code);
    const error_code = err.error_code || 500
    const error = {
        title: 'Error',
        message: err.message,
    }
    res.status(error_code).json(error)
}

module.exports = errorHandler