const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

// Define middlewares
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send("Working")
})

app.listen(5000, () => {
    console.log(`Server listening at port: ${PORT}`)
})