import React, { createContext, useState } from 'react'
import axios from 'axios'

export const RecipesContext = createContext()

function RecipesContextProvider({ children }) {

    const url = 'http://localhost:5000'

    const fetchRecipes = () => {
        axios.get(url)
        .then((response) => {
            setRecipes(response.data)
            console.log("fetched")
        })
        .catch((error) => { console.log(error) })
    }
    const [submitBtn, setSubmitBtn] = useState('Add Recipe')
    const [showCancelEditBtn, setShowCancelEditBtn] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [newRecipeId, setNewRecipeId] = useState('')
    const [recipeName, setRecipeName] = useState('')

    return (
        <div>
            <RecipesContext.Provider value={{
                showCancelEditBtn, setShowCancelEditBtn,
                recipes, setRecipes, 
                recipeName, setRecipeName, 
                newRecipeId, setNewRecipeId,
                submitBtn, setSubmitBtn,
                url, fetchRecipes
            }}>
                { children }
            </RecipesContext.Provider>
        </div>
    )
}

export default RecipesContextProvider
