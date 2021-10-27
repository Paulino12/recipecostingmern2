import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import { RecipesContext } from '../contexts/RecipesContext'
import { NotificationsContext } from '../contexts/NotificationsContext'


function CostingRecipeCard({ recipe, recipeId }) {
    const { setNotification, setShowNotification } = useContext(NotificationsContext)
    const { url,
        setIsLoading,
        setShowCancelEditBtn,
        setSubmitBtn,
        fetchRecipes, setRecipeName, setClickedRecipeName,
        setClickedRecipeId, setShowRecipeData
    } = useContext(RecipesContext)

    // View recipe data
    const viewRecipeData = () => {
        // Initiate isLoading
        setIsLoading(true)
        // Clear recipe name input field
        setRecipeName('') 
        // Recipe name of clicked recipe card
        setClickedRecipeName(recipe)
        setShowRecipeData(true)
        setClickedRecipeId(recipeId)
        // Cancel any potential edit procedure
        setShowCancelEditBtn(false)
        setSubmitBtn("Add Recipe")
    }

    // Handle edit recipe
    const handleEdit = () => {
        setShowRecipeData(false)
        setClickedRecipeId(recipeId)
        setRecipeName(recipe)
        setShowCancelEditBtn(true)
        setSubmitBtn("Update Recipe")
    }

    // Delete recipe
    const deleteRecipe = () => {
        axios.delete(`${url}/recipes/${recipeId}`)
            .then((response) => {
                setShowNotification(true)
                setNotification(`"${recipe}" successfully deleted`)
                fetchRecipes()
                // Resetting the display after item is deleted
                setShowRecipeData(false)
            })
            .catch((error) => { console.log(error) })
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <div><h5 className="mb-0 text-capitalize">{recipe}</h5></div>
                <div className="d-flex flex-row">
                    <motion.div onClick={viewRecipeData}
                    whileTap={{scale: 0.9}} 
                    className='pointer text-success p-0'
                    >
                        <VisibilityIcon />
                    </motion.div>

                    <motion.div onClick={handleEdit}
                    whileTap={{scale: 0.9}} 
                    className='pointer p-0'
                    >
                        <EditIcon />
                    </motion.div>

                    <motion.div onClick={deleteRecipe}
                    whileTap={{scale: 0.9}} 
                    className='pointer text-danger p-0'><DeleteIcon /></motion.div>
                </div> 
            </div>        
        </div>
    )
}

export default CostingRecipeCard
