const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const config = require('../config/env')



const registerUser = asyncHandler(async(req, res) => {
    if(!req.body){
        res.status(400)
        throw new Error('Error. No request body')
    }

    const { username, password, firstName, lastName, role } = req.body

    if (!username) {
        res.status(400)
        throw new Error('Username is required')
    }
    if (!password) {
        res.status(400)
        throw new Error('Password is required')
    }
    if (!firstName) {
        res.status(400)
        throw new Error('FirstName is required')
    }
    if (!lastName) {
        res.status(400)
        throw new Error('Last Name is required')
    }
    if (!role) {
        throw new Error('Role is required')
    }

    const roles = ['admin', 'student']
    if (!roles.includes(role.toLowerCase())) {
        res.status(400)
        throw new Error('Role has to be admin or student')
    }

    try {
        // check if user exists
        const userExists = await User.findOne({ username })

        if(userExists){
            res.status(400)
            throw new Error(`User with username ${username} already exists`)
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            username: username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            role: role
        })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

    return res.status(201).json({
        msg: `An account has been created for ${username}`
    })

})

const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body

    if(!username){
        res.status(400)
        throw new Error('Please enter username')
    }
    if(!password){
        res.status(400)
        throw new Error('Please enter password')
    }

    // check if user exists
    const user = await User.findOne({ username })

    if (!user) {
        res.status(404)
        throw new Error('Invalid username or password')
    }

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            msg: 'Successful Login',
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const generateToken = ( id ) => {
    return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser
}