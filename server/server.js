const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
// Configuring environment
dotenv.config()
// Importing Routes
const recipesRouter = require('./routes/recipesRoutes')
const ingredientsRouter = require('./routes/ingredientsRoutes')

const app = express()

// Initiating middlewares
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Implementing routes
app.use('/', recipesRouter)
app.use('/', ingredientsRouter)


const PORT = process.env.PORT || 8000
const dbConnexion = process.env.RECIPECOSTINGMERN_URI

// Connecting to database at MongoDb
mongoose.connect(dbConnexion)
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`Server listening at port: ${PORT}`);
        })
    })
    .catch((err) => {
        res.status(400).json({ error: err.message })
    })








