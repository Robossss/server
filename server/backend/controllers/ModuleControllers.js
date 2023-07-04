const asyncHandler = require('express-async-handler')
const Module = require('../models/ModuleModel')
const Lessons = require('../models/LessonModel')
const Progress = require('../models/ProgressModel')

const createModule = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authenticated')
    }
    if(req.user.role !== 'admin'){
        res.status(400)
        throw new Error('Not authorized. Only admins allowed')
    }

    if(!req.body){
        res.status(400)
        throw new Error('Bad request. No body')
    }

    const { name } = req.body

    if(!name) {
        res.status(400)
        throw new Error('Name is required')
    }

    const module = await Module.create({
        name
    })

    res.status(201).json(module)
})

const getModules = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authorized')
    }

    const modules = await Module.find()

    const populatedModules = await Promise.all(
        modules.map(async (module) => {
            const progress = await Progress.find({
                user : req.user._id,
                level: module._id
            })

            return { progress, modules}
        })
    )
    res.status(200).json(populatedModules)
})

const updateModule = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authenticated')
    }
    if(req.user.role !== 'admin'){
        res.status(400)
        throw new Error('Not authorized. Only admins allowed')
    }

    if(!req.body){
        res.status(400)
        throw new Error('Bad request. No body')
    }

    const { id } = req.params

    if(!id){
        res.status(400)
        throw new Error('There is no id. Bad request')
    }

    const { name } = req.body

    if(!name){
        res.status(400)
        throw new Error('Name is required')
    }

    
    const module = await Module.findById(id)
    
    if(!module){
        res.status(404)
        throw new Error(`module with id of ${ id } does not exist`)
    }

    const updatedModule = await Module.findByIdAndUpdate(id, req.body, { new: true })

    res.status(201).json(updatedModule)
})
const deleteModule = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authenticated')
    }
    if(req.user.role !== 'admin'){
        res.status(400)
        throw new Error('Not authorized. Only admins allowed')
    }

    const { id } = req.params

    if(!id){
        res.status(400)
        throw new Error('There is no id. Bad request')
    }
    const module = await Module.findById(id)
    
    if(!module){
        res.status(404)
        throw new Error(`module with id of ${ id } does not exist`)
    }

    await Module.findByIdAndDelete({ _id: id })

    res.status(204).json({ id })
})

const getModuleLessons = asyncHandler(async (req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authenticated')
    }

    const { id } = req.params

    if(!id){
        res.status(400)
        throw new Error('There is no id. Bad request')
    }
    const module = await Module.findById(id)
    
    if(!module){
        res.status(404)
        throw new Error(`module with id of ${ id } does not exist`)
    }

    const lessons = await Lessons.find({
        module: module._id
    })

    res.status(200).json({
        module,
        lessons
    })
})

module.exports = {
    createModule,
    getModules,
    updateModule,
    deleteModule,
    getModuleLessons
}