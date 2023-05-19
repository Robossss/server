const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const config = require('../config/env')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // get token
            token = req.headers.authorization.split(' ')[1]

            // verify the token
            const decoded = jwt.verify(token, config.JWT_SECRET)

            // GET user from the token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch(err) {
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized. No token')
    }
})

module.exports = { protect }