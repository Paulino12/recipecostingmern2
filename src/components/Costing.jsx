import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import CostingRecipeCard from './CostingRecipeCard'
import Notifications from './Notifications'
import { RecipesContext } from '../contexts/RecipesContext'
import { NotificationsContext } from '../contexts/NotificationsContext'
import CancelIcon from '@mui/icons-material/Cancel'

function Costing() {
    const {
        notification, setNotification,
        showNotification, setShowNotification
    } = useContext(NotificationsContext)
    const { url,
        showCancelEditBtn, setShowCancelEditBtn,
        submitBtn, setSubmitBtn,
        recipes, fetchRecipes, recipeName, setRecipeName,
        newRecipeId, setNewRecipeId
     } = useContext(RecipesContext)

    useEffect(() => {
        fetchRecipes()
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [])

    const handleCancelEdit = () => {
        setRecipeName('')
        setShowCancelEditBtn(false)
        setNewRecipeId('')
        setSubmitBtn("Add Recipe")
    }

    // Create recipe
    const createRecipe = (e) => {
        e.preventDefault()
        if(submitBtn === "Add Recipe"){
            axios.post(url, { recipeName: recipeName })
            .then((response) => {
                setShowNotification(true)
                setNotification(`"${recipeName}" successfully created`)
                setRecipeName('')
                fetchRecipes()
            })
            .catch((error) => { console.log(error) })
        }else{
            axios.put(`${url}/recipe/${newRecipeId}`, { recipeName: recipeName })
            .then((response) => {
                setShowNotification(true)
                setNotification(`"${recipeName}" successfully updated`)
                fetchRecipes()
            })
            .catch((error) => { console.log(error) })
            handleCancelEdit()
        }   
    }

    return (
        <div className="container position-relative">
            <div className="text-center bg-light rounded p-3 my-3">
                <h4>Recipe Costing APP</h4>
            </div>
            <AnimatePresence>
                {
                    showNotification &&
                    <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity: 1, x: -50}}
                    transition={{duration: 0.5}}
                    exit={{opacity: 0, y: -50}}
                    className={`notificationComponent rounded mt-1 
                    ${notification.includes('deleted') ? 'alert-danger' : 'alert-success'}`}>
                        <Notifications />
                    </motion.div>
                }
            </AnimatePresence>
            {
                recipes.length > 0 ?
                <div className="badge bg-info mb-3 py-2 fs-5">
                    {`You currently have ${recipes.length} recipe(s) in your portfolio`}
                </div>
                :
                <div className="badge bg-info mb-3 py-2 fs-5">
                    {`You currently have NO recipe(s) in your portfolio`}
                </div>
            }
            <div className="mb-3">
                <form onSubmit={createRecipe}>
                    <div className="row g-3 align-items-center">
                        <div className="col-sm-7">
                            <input value={recipeName} onChange={(e) => setRecipeName(e.target.value)}
                            className="form-control py-3" type="text" name="" id="" placeholder="Create a New Recipe Here" required />
                        </div>
                        
                        <div className="col-sm">
                            {
                                showCancelEditBtn &&
                                <motion.button onClick={handleCancelEdit}
                                whileTap={{scale:0.9}} type="submit" className="btn btn-danger me-2">
                                    <CancelIcon />
                                </motion.button>
                            }
                            <motion.button 
                            whileTap={{scale:0.9}} type="submit" className="btn btn-success">{submitBtn}</motion.button>
                        </div>
                    </div>
                </form>
            </div>
            
            <div className="row">
                <div className="col-md-3">
                    <div>
                        <div>
                            {
                                recipes.map((recipe, index) => {
                                return <div key={index} 
                                        className={`card shadow p-2  mb-2 pointer ${recipe._id===newRecipeId?'bg-warning':''}`}>
                                        <CostingRecipeCard 
                                        recipe={recipe.recipeName}
                                        recipeId={recipe._id} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    Recipes costing and data here
                </div>
            </div>
        </div>
    )
}

export default Costing
