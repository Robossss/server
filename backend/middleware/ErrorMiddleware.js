const config = require('../config/env')

const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500
    

    res.status(statusCode).json({
        error: true,
        message: err.message,
        stack: config.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}