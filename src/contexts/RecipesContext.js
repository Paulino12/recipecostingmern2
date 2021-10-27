import React, { createContext, useState } from 'react'
import axios from 'axios'

export const RecipesContext = createContext()

function RecipesContextProvider({ children }) {

    const url = 'http://localhost:5000'

    const fetchRecipes = () => {
        axios.get(url)
        .then((response) => {
            setRecipes(response.data)
        })
        .catch((error) => { console.log(error) })
    }
    const [isLoading, setIsLoading] = useState(false)
    const [submitBtn, setSubmitBtn] = useState('Add Recipe')
    const [showCancelEditBtn, setShowCancelEditBtn] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [clickedRecipeId, setClickedRecipeId] = useState('')
    const [recipeName, setRecipeName] = useState('')
    const [clickedRecipeName, setClickedRecipeName] = useState('')
    const [showRecipeData, setShowRecipeData] = useState(false)
    const [recipeDesc, setRecipeDesc] = useState('')

    return (
        <div>
            <RecipesContext.Provider value={{
                isLoading, setIsLoading,
                showCancelEditBtn, setShowCancelEditBtn,
                recipes, setRecipes, 
                recipeName, setRecipeName, 
                clickedRecipeId, setClickedRecipeId,
                clickedRecipeName, setClickedRecipeName,
                submitBtn, setSubmitBtn,
                url, fetchRecipes, 
                showRecipeData, setShowRecipeData,
                recipeDesc, setRecipeDesc
            }}>
                { children }
            </RecipesContext.Provider>
        </div>
    )
}

export default RecipesContextProvider
