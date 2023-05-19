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

    if(!username) throw new Error('Username is required')
    if(!password) throw new Error('Password is required')
    if(!firstName) throw new Error('FirstName is required')
    if(!lastName) throw new Error('Last Name is required')
    if(!role) throw new Error('Role is required')

    const roles = ['admin', 'student']
    if (!roles.includes(role.toLowerCase())){
        res.status(400)
        throw new Error('Role has to be admin or student')
    }

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
        otherName: req.body.otherName,
        role: role
    })

    res.status(201).json(user)

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