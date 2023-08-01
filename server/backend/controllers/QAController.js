const asyncHandler = require('express-async-handler')
const QA = require('../models/QAModel')
const Module = require('../models/ModuleModel')


const createQA = asyncHandler(async(req, res) => {
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

    const { question, options, correctOption, level } = req.body

    const module = await Module.findById(level)

    if(!module){
        res.status(404)
        throw new Error(`Module with id ${level} does not exist`)
    }
    if(!question) {
        res.status(400)
        throw new Error('Question is required')
    }
    
    if(!correctOption) {
        res.status(400)
        throw new Error('Correct Option is required')
    }

    const qa = await QA.create({
        question,
        options,
        correctOption,
        level
    })

    res.status(201).json(qa)
})
const getQAs = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authorized')
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

    const qas = await QA.find({ level: id })

    res.status(200).json(qas)
})
const updateQA = asyncHandler(async(req, res) => {
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

    const { question, option1, option2, correctOption, level } = req.body

    const module = await Module.findById(level)

    if(!module){
        res.status(404)
        throw new Error(`Module with id ${level} does not exist`)
    }
    const { id } = req.params

    if(!id){
        res.status(400)
        throw new Error('There is no id. Bad request')
    }
    const qa = await QA.findById(id)

    if(!qa){
        res.status(404)
        throw new Error(`QA with id of ${ id } does not exist`)
    }
    if(!question) {
        res.status(400)
        throw new Error('Question is required')
    }
    if(!option1) {
        res.status(400)
        throw new Error('Option One is required')
    }
    if(!option2) {
        res.status(400)
        throw new Error('Option Two is required')
    }
    if(!correctOption) {
        res.status(400)
        throw new Error('Correct Option is required')
    }

    const updatedQA = await QA.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(201).json(updatedQA)

})

const deleteQA = asyncHandler(async(req, res) => {
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
    const qa = await QA.findById(id)
    
    if(!qa){
        res.status(404)
        throw new Error(`QA with id of ${ id } does not exist`)
    }

    await QA.findByIdAndDelete({ _id: id })

    res.status(204).json({ id })

    
})

module.exports = {
    createQA,
    getQAs,
    updateQA,
    deleteQA
}