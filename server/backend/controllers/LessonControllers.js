const asyncHandler = require('express-async-handler')
const Module = require('../models/ModuleModel')
const Lesson = require('../models/LessonModel')

const createLesson = asyncHandler(async(req, res) => {
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

    const { subject, lessons, module } = req.body

    if(!lessons){
        res.status(400)
        throw new Error('Content is required')
    }
    if(!module){
        res.status(400)
        throw new Error('Module is required')
    }

    const moduleExists = await Module.findById(module)

    if(!moduleExists){
        res.status(404)
        throw new Error(`Module with id of ${module} does not exist`)
    }

    const lesson = await Lesson.create({
        lessons,
        module,
        subject
    })

    res.status(201).json(lesson)
})

const getLessons = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authenticated')
    }

    const { id } = req.params

    if(!id){
        res.status(400)
        throw new Error('No id bad request')
    }

    const module = await Module.findById(id)

    if(!module){
        res.status(404)
        throw new Error(`Module with id ${id} does not exist`)
    }

    const lessons = await Lesson.find({ module: id })

    res.status(200).json(lessons)

})

const updateLesson = asyncHandler(async(req, res) => {
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

    const { title, content, module } = req.body

    if(!title){
        res.status(400)
        throw new Error('Title is required')
    }
    if(!content){
        res.status(400)
        throw new Error('Content is required')
    }
    if(!module){
        res.status(400)
        throw new Error('Module is required')
    }

    const { id } = req.params

    const lesson = Lesson.findById(id)

    if(!lesson){
        res.status(404)
        throw new Error('Lesson cannot be found')
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(201).json(updatedLesson)
})


const deleteLesson = asyncHandler(async(req, res) => {
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
    const lesson = await Lesson.findById(id)
    
    if(!lesson){
        res.status(404)
        throw new Error(`Lesson with id of ${ id } does not exist`)
    }

    await Lesson.findByIdAndDelete({ _id: id })

    res.status(200).json({ id })

})
module.exports = {
    createLesson,
    getLessons,
    updateLesson,
    deleteLesson
}