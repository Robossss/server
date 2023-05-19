const asyncHandler = require('express-async-handler')
const QA = require('../models/QAModel')


const createQA = asyncHandler(async(req, res) => {
    res.json({
        msg: 'Creating QA'
    })
})
const getQAs = asyncHandler(async(req, res) => {
    res.json({
        msg: 'Get all QAs'
    })
})
const updateQA = asyncHandler(async(req, res) => {
    res.json({
        msg: 'Updating QA'
    })
})

const deleteQA = asyncHandler(async(req, res) => {
    res.json({
        msg: 'Deleting QA'
    })
})

module.exports = {
    createQA,
    getQAs,
    updateQA,
    deleteQA
}