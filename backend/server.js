const express = require('express')
require('dotenv').config()
const colors = require('colors')
const config = require('./config/env')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/ErrorMiddleware')
const port = config.PORT || 5000



// Connect DB
connectDB()


// Init app
const app = express()

// Middleware
app.use(errorHandler)
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit:"50mb" }))


// routes
app.use('/api/v1/auth', require('./routes/UserRoutes'))
app.use('/api/v1/qa', require('./routes/QARoutes'))
app.use('/api/v1/module', require('./routes/ModuleRoutes'))
app.use('/api/v1/lesson', require('./routes/LessonRoutes'))

// Listen to the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`.blue.underline)
})