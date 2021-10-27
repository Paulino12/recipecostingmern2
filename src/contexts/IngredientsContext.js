import React, { createContext, useState } from 'react'
import axios from 'axios'

export const IngredientsContext = createContext()

function IngredientsContextProvider({ children }) {

    const url = 'http://localhost:5000/recipes'

    // Fetcheing ingredients
    const fetchIngredients = (extendedUrl) => {
        axios.get(`${url}/${extendedUrl}`)
        .then((response) => {
            setIngredientsList(response.data)
        })
        .catch((error) => { console.log(error) })
    }

    const [ingredientName, setIngredientName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState('G')
    const [myQuantity, setMyQuantity] = useState(0)
    const [costPerIngredient, setCostPerIngredient] = useState(0)
    const [ingredientBtn, setIngredientBtn] = useState('Add')

    const [ingredientsList, setIngredientsList] = useState([])

    return (
        <div>
            <IngredientsContext.Provider value={{
                url,
                ingredientName, setIngredientName,
                price, setPrice, quantity, setQuantity,
                unit, setUnit, myQuantity, setMyQuantity,
                costPerIngredient, setCostPerIngredient,
                ingredientBtn, setIngredientBtn,
                ingredientsList, setIngredientsList,
                fetchIngredients
            }}>
                { children }
            </IngredientsContext.Provider>
        </div>
    )
}

export default IngredientsContextProvider
