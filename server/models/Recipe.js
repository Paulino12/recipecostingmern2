// In this recipe model we create a recipe schema
const mongoose = require('mongoose')
const { Schema } = mongoose

const recipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe