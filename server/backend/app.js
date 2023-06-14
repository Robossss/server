const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit:"50mb" }))

// routes
app.use('/api/v1/auth', require('./routes/UserRoutes'))
app.use('/api/v1/qa', require('./routes/QARoutes'))
app.use('/api/v1/module', require('./routes/ModuleRoutes'))
app.use('/api/v1/lesson', require('./routes/LessonRoutes'))


module.exports = app