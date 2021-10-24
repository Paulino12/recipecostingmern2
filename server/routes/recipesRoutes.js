const express = require('express')

// Importing controllers
const {   
    readRecipes, createRecipe, updateRecipe, deleteRecipe
 } = require('../controllers/recipesController')

const router = express.Router()

// Read recipes
router.get('/', readRecipes)

// Create a recipe
router.post('/', createRecipe)

// Update Recipe
router.put('/recipes/:id', updateRecipe)

// Delete a recipe
router.delete('/recipes/:id', deleteRecipe)

module.exports = router

