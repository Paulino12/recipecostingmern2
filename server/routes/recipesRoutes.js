const express = require('express')

// Importing controllers
const {   
    readRecipes, createRecipe, readSpecificRecipe, updateRecipe, deleteRecipe
 } = require('../controllers/recipesController')

const router = express.Router()

// Read recipes
router.get('/', readRecipes)

// Create a recipe
router.post('/', createRecipe)

// Read specific recipe
router.get('/recipes/:id', readSpecificRecipe)

// Update Recipe
router.put('/recipes/:id', updateRecipe)

// Delete a recipe
router.delete('/recipes/:id', deleteRecipe)

module.exports = router

