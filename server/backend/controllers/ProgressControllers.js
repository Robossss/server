const asyncHandler = require('express-async-handler')
const Module = require('../models/ModuleModel')
const Progress = require('../models/ProgressModel')

const createProgress = asyncHandler(async (req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authenticated')
    }

    if(!req.body){
        res.status(400)
        throw new Error('Bad request. No body')
    }

    const { level } = req.body
    if (!level) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const module = await Module.findById(level)

    if (!module) {
        res.status(404)
        throw new Error('Such a module does not exist')
    }

    

    const progressLevel = await Progress.create({
        level: module._id,
        user: req.user.id
    })

    res.status(200).json({
        progressLevel
    })
})


const updateProgress = asyncHandler(async (req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authenticated')
    }

    if(!req.body){
        res.status(400)
        throw new Error('Bad request. No body')
    }

    const { progress, level } = req.body
    if (!level || !progress) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const module = await Module.findById(level)

    if (!module) {
        res.status(404)
        throw new Error('Such a module does not exist')
    }

    

    const progressLevel = await Progress.findById(req.params.id)

    if (!progressLevel) {
        res.status(404)
        throw new Error('Please start the module afresh')
    }

    if (progress == 100) {
        progressLevel.progressType = 'Completed'
        progressLevel.progress = 100
        await progressLevel.save()
    }
    progressLevel.progress = progress
    await progressLevel.save()
    
    res.status(200).json({
        progressLevel
    })
})


module.exports = {
    createProgress,
    updateProgress
}