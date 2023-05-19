const asyncHandler = require('express-async-handler')


const createModule = asyncHandler(async(req, res) => {
    res.json({
        msg: 'Creating modules'
    })
})
const getModules = asyncHandler(async(req, res) => {
    res.json({
        msg: 'Get all modules'
    })
})
const updateModule = asyncHandler(async(req, res) => {
    res.json({
        msg: 'Update a module'
    })
})
const deleteModule = asyncHandler(async(req, res) => {
    res.json({
        msg: 'Delete a module'
    })
})

module.exports = {
    createModule,
    getModules,
    updateModule,
    deleteModule
}