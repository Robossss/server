const router = require('express').Router()

const { protect } = require('../middleware/AuthMiddleware')

const {
    createLesson,
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson
} = require('../controllers/LessonControllers')

router.post('/create', protect, createLesson)
router.get('/single/:id', protect, getLesson)

router.route('/:id')
        .get(protect, getLessons)
        .put(protect, updateLesson)
        .delete(protect, deleteLesson)

module.exports = router