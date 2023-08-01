const asyncHandler = require('express-async-handler')
const Video = require('../models/VideoModel')

const createVideo = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(400)
        throw new Error('Not authorized. Only admins allowed')
    }
    console.log('printing')
    if(!req.body){
        res.status(400)
        throw new Error('Bad request. No body')
    }

    const { module, videoUrl } = req.body
    console.log('printing')
    console.log(module)
    console.log(videoUrl)
    const video = await Video.create({
        module,
        videoUrl
    })

    res.status(201).json(video)
})

module.exports = {
    createVideo
}