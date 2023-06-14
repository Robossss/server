require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const config = require('./config/env')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/ErrorMiddleware')
const port = config.PORT || 5000

const app = require('./app')

// Connect DB
connectDB()


// Init app

// Middleware
app.use(errorHandler)
const corsOptions = {
    origin: '*', 
    methods: '*', 
    allowedHeaders: '*', 
    allowOrigin: '*'
  };
  
  app.use(cors(corsOptions));
  



// Listen to the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`.blue.underline)
})