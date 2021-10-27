const Ingredient = require('../models/Ingredient')

// Read Ingredients
const readIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find({recipe: req.params.recipeId}).sort({ createdAt: -1})
        res.json(ingredients)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Create Ingredient
const createIngredient = async (req, res) => {
    try {
        const newIgredient = new Ingredient(req.body)
        await newIgredient.save()
        res.status(201).json(newIgredient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update Ingredient
const updateIngredient = async (req, res) => {
    try {
        const ingredientId = req.params.ingredientId
        const newIngredient = req.body
        await Ingredient.findByIdAndUpdate(ingredientId, newIngredient)
        res.status(201).json({msg: `${newIngredient.ingredientName} successfully updated`})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete Ingredient
const deleteIngredient = async (req, res) => {
    try {
        const ingredientId = req.params.ingredientId
        const ingredientById = Ingredient.findById(ingredientId)
        await Ingredient.findByIdAndDelete(ingredientId)
        res.status(201).json({msg: `${ingredientById.ingredientName} successfully deleted`})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    readIngredients, createIngredient, updateIngredient, deleteIngredient
}