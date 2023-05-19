const router = require('express').Router()

const { protect } = require('../middleware/AuthMiddleware')

const {
    createQA,
    getQAs,
    updateQA,
    deleteQA
} = require('../controllers/QAController')

router.post('/create', protect, createQA)
router.get('/', protect, getQAs)

router.route('/:id')
        .put(protect, updateQA)
        .delete(protect, deleteQA)


module.exports = router