const router = require('express').Router()

const { protect } = require('../middleware/AuthMiddleware')
const upload = require('../utils/multer')

const {
    createModule,
    getModules,
    updateModule,
    deleteModule,
    getModuleLessons
} = require('../controllers/ModuleControllers')


router.post('/create', protect, createModule)
router.get('/', protect, getModules)

router.route('/:id')
        .get(protect, getModuleLessons)
        .put(protect, updateModule)
        .delete(protect, deleteModule)

module.exports = router