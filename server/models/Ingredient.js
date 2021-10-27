// In this ingredient model we create an ingredient schema
const mongoose = require('mongoose')
const { Schema } = mongoose
const Recipe = require('./Recipe')

const ingredientSchema = new Schema({
    ingredientName: { type: String, required: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    quantity: { type: mongoose.Types.Decimal128, required: true },
    unit: { type: String, required: true },
    myQuantity: { type: mongoose.Types.Decimal128, required: true },
    costPerIngredient: { type: mongoose.Types.Decimal128 },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
}, { timestamps: true })

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient