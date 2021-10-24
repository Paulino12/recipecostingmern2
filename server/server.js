const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
// Configuring environment
dotenv.config()
// Importing Routes
const recipesRouter = require('./routes/recipesRoutes')

const app = express()

// Initiating middlewares
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// Implementing routes
app.use('/', recipesRouter)

const PORT = process.env.PORT || 8000

// Connecting to database at MongoDb
mongoose.connect('mongodb+srv://ytem12:Magniaga12@cluster0.wil2c.mongodb.net/recipecosting?retryWrites=true&w=majority')
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`Server listening at port: ${PORT}`);
        })
    })
    .catch((err) => {
        res.status(400).json({ error: err.message })
    })




