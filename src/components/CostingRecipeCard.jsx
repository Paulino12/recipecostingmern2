import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import { RecipesContext } from '../contexts/RecipesContext'
import { NotificationsContext } from '../contexts/NotificationsContext'


function CostingRecipeCard({ recipe, recipeId }) {
    const { setNotification, setShowNotification } = useContext(NotificationsContext)
    const { url,
        setShowCancelEditBtn,
        setSubmitBtn,
        fetchRecipes, setRecipeName, setNewRecipeId
    } = useContext(RecipesContext)

    // Handle edit recipe
    const handleEdit = () => {
        setNewRecipeId(recipeId)
        setRecipeName(recipe)
        setShowCancelEditBtn(true)
        setSubmitBtn("Update Recipe")
    }

    // Delete recipe
    const deleteRecipe = () => {
        axios.delete(`${url}/recipe/${recipeId}`)
            .then((response) => {
                setShowNotification(true)
                setNotification(`"${recipe}" successfully deleted`)
                fetchRecipes()
            })
            .catch((error) => { console.log(error) })
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <div><h5 className="mb-0 text-capitalize">{recipe}</h5></div>
                <div className="d-flex flex-row">
                    <motion.div onClick={handleEdit}
                    whileTap={{scale: 0.9}} 
                    className='pointer text-success p-0'
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
