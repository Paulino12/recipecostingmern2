// In this ingredient model we create an ingredient schema
const mongoose = require('mongoose')
const { Schema } = mongoose
const Recipe = require('./Recipe')

const ingredientSchema = new Schema({
    ingredientName: {
        type: String,
        required: true
    },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
}, { timestamps: true })

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient