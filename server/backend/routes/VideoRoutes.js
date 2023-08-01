const videoRouter = require('express').Router()

const { protect } = require('../middleware/AuthMiddleware')

const {
    createVideo
} = require('../controllers/VideoControllers')

videoRouter.post('/create', protect, createVideo)

module.exports = videoRouter