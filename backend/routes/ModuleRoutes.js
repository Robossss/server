const router = require('express').Router()

const { protect } = require('../middleware/AuthMiddleware')

const {
    createModule,
    getModules,
    updateModule,
    deleteModule
} = require('../controllers/ModuleControllers')


router.post('/create', protect, createModule)
router.get('/', protect, getModules)

router.route('/:id')
        .put(protect, updateModule)
        .delete(protect, deleteModule)

module.exports = router