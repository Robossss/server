const asyncHandler = require('express-async-handler')
const Module = require('../models/ModuleModel')
const Lessons = require('../models/LessonModel')
const Progress = require('../models/ProgressModel')
const Video = require('../models/VideoModel')


const createModule = asyncHandler(async(req, res) => {
    if(req.user.role !== 'admin'){
        res.status(400)
        throw new Error('Not authorized. Only admins allowed')
    }

    if(!req.body){
        res.status(400)
        throw new Error('Bad request. No body')
    }

    const { name, images, description } = req.body

    if(!name) {
        res.status(400)
        throw new Error('Name is required')
    }

    

    const module = await Module.create({
        name,
        description,
        images
    })

    res.status(201).json(module)
})

const getModules = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authorized')
    }

    const modules = await Module.find()
    
    // get the progress attached to the modules
    const populatedModules = await Promise.all(
        modules.map(async (module) => {
            const progress = await Progress.find({
                user : req.user._id,
                level: module._id
            }).populate('level', 'name images')
            
            return progress
        }   
        ) 
    )
    
    let oldProgressArray = []
    
    oldProgressArray.push(populatedModules[0][0])
    oldProgressArray.push(populatedModules[1][0])
    // Construct the progress array dynamically
    // const progressArray = populatedModules.map(progress => ({ progress }));

   
    // Create the final object
    const result = {
        progress: oldProgressArray,
        modules
    };

    res.status(200).json(result);
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

const getModule = asyncHandler(async(req, res) => {
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

    

    res.status(200).json({ module })
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
    const module = await Module.findById(id).select('-images')
    
    if(!module){
        res.status(404)
        throw new Error(`module with id of ${ id } does not exist`)
    }
    const video = await Video.findOne({
        module: module._id
    })

    const lessons = await Lessons.find({
        module: module._id
    }).populate('module', 'name')
    
    res.status(200).json({
        lessons,
        module,
        video
    })
})

module.exports = {
    createModule,
    getModules,
    getModule,
    updateModule,
    deleteModule,
    getModuleLessons
}