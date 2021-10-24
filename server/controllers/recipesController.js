// Importing Recipe model
const Recipe = require('../models/Recipe')

// Read recipes (GET)
const readRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({createdAt: -1})
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Create recipe
const createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe(req.body)
        await recipe.save()
        res.status(201).json(recipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
}

// Update recipe
const updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id
        const newRecipe = req.body
        await Recipe.findByIdAndUpdate(recipeId, newRecipe)  
        res.status(201).json({msg: `${newRecipe.recipeName} successfully updated`})  
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete recipe
const deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id
        const recipeById = await Recipe.findById(recipeId)
        await Recipe.findByIdAndDelete(recipeId)
        res.status(202).json({msg: `${recipeById.recipeName} successfully deleted`})
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    readRecipes, createRecipe, updateRecipe, deleteRecipe
}