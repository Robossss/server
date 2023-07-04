const router = require('express').Router()

const { protect } = require('../middleware/AuthMiddleware')

const { createProgress, updateProgress} = require('../controllers/ProgressControllers')

router.post('/create', protect, createProgress)
router.put('/:id', protect, updateProgress)

module.exports = router