const express = require('express')

const { 
    readIngredients, createIngredient,
    updateIngredient, deleteIngredient
 } = require('../controllers/ingredientsController')

const router = express.Router()

// Read ingredients
router.get('/recipes/:recipeId/ingredients', readIngredients)

// Create ingredient
router.post('/recipes/:recipeId/ingredients', createIngredient)

// Update ingredient
router.put('/recipes/:recipeId/ingredients/:ingredientId', updateIngredient)

// Delete ingredient
router.delete('/recipes/:recipeId/ingredients/:ingredientId', deleteIngredient)

module.exports = router
