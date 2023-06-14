const router = require('express').Router()

const { protect } = require('../middleware/AuthMiddleware')

const {
    createLesson,
    getLessons,
    updateLesson,
    deleteLesson
} = require('../controllers/LessonControllers')

router.post('/create', protect, createLesson)

router.route('/:id')
        .get(protect, getLessons)
        .put(protect, updateLesson)
        .delete(protect, deleteLesson)

module.exports = router