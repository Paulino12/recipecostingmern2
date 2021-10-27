import React, { useContext, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import { IngredientsContext } from '../contexts/IngredientsContext'
import { NotificationsContext } from '../contexts/NotificationsContext'
import { Button } from '@mui/material'

function CostingRecipeIngredients({ recipeId }) {
    const {
        setNotification, setShowNotification
    } = useContext(NotificationsContext)
    const { url,
        ingredientName, setIngredientName,
        price, setPrice, quantity, setQuantity,
        unit, setUnit, myQuantity, setMyQuantity,
        costPerIngredient, setCostPerIngredient,
        ingredientsList,
        fetchIngredients
    } = useContext(IngredientsContext)

    // const [ingredientsList, setIngredientsList] = useState([])
    const [ingredientBtn, setIngredientBtn] = useState("Add")

    const [ingredientId, setIngredientId] = useState('')
    const [editingIngredient, setEditingIngredient] = useState(false)

    // Resetting Form
    const resetForm = () => {
        setIngredientName('')
        setPrice('')
        setQuantity('')
        setUnit('')
        setMyQuantity('')
        setCostPerIngredient('0.00')
    }

    useEffect(() => {
        fetchIngredients(`${recipeId}/ingredients`)
        // axios.get(`${url}/${recipeId}/ingredients`)
        // .then((response) => {
        //     setIngredientsList(response.data)
        // })
        // .catch((error) => { console.log(error) })
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [recipeId, ingredientsList.length])

    useEffect(() => {
        setPrice('')
        setQuantity('')
        setMyQuantity('')
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(quantity === "" || quantity === 0){
            return
        }else{
            setCostPerIngredient(parseFloat((myQuantity * price)/quantity).toFixed(2))
        }
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [price, quantity, myQuantity])

    const editIngredient = (
        ingredientId, ingredientName, price, quantity, unit, myQuantity, costPerIngredient
    ) => {
        setEditingIngredient(true)
        setIngredientId(ingredientId)
        setIngredientBtn("Update")
        setIngredientName(ingredientName)
        setPrice(price)
        setQuantity(quantity)
        setUnit(unit)
        setMyQuantity(myQuantity)
        setCostPerIngredient(costPerIngredient)
    }

    const cancelEditIngredient = () => {
        setEditingIngredient(false)
        setIngredientId()
        setIngredientBtn("Add")
        // Reset Form
        resetForm()
    }

    // Add ingredients
    const handleIngredient = (e) => {
        e.preventDefault()
        if(ingredientBtn === "Update"){
            axios.put(`${url}/${recipeId}/ingredients/${ingredientId}`, {
                ingredientName: ingredientName,
                price: price,
                quantity: quantity,
                unit: unit,
                myQuantity: myQuantity,
                costPerIngredient: costPerIngredient,
            }).then((response) => {
                setShowNotification(true)
                setNotification(`You successfully updated "${ingredientName}"`)
                // Reset
                // Fetch back ingredients
                fetchIngredients(`${recipeId}/ingredients`)
            })
            cancelEditIngredient()
        }else{
            // Add new ingredient
            axios.post(`${url}/${recipeId}/ingredients`, {
                ingredientName: ingredientName,
                price: price,
                quantity: quantity,
                unit: unit,
                myQuantity: myQuantity,
                costPerIngredient: costPerIngredient,
                recipe: recipeId
            }).then((response) => {
                setShowNotification(true)
                setNotification(`You successfully added ${ingredientName}`)  
                // Fetch back ingredients
                fetchIngredients(`${recipeId}/ingredients`)
            }).catch((error) => {
                console.log(error)
            })
            resetForm()
        }
    }

    const deleteIngredient = (ingredientId, ingredientName) => {
        axios.delete(`${url}/${recipeId}/ingredients/${ingredientId}`)
            .then((response) => {
                setShowNotification(true)
                setNotification(`You successfully deleted "${ingredientName}"`)
                // Fetch back ingredients
                fetchIngredients(`${recipeId}/ingredients`)
            })
            .catch((error) => {
                console.log(error) 
            })
    }

    return (
        <div className="card shadow rounded">
            <div className="card-header">
                <Button type="submit" variant="contained" className="h-100" color="success">
                    Change Colors
                </Button>
            </div>
            <div className="card-body">
                <form onSubmit={handleIngredient}
                autoComplete="off" className="position-relative">
                    <div className="table-responsive">
                        <table className="table table-striped table-borderless text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th className="col-md-3">
                                        Ingredient(s)
                                        {
                                            !ingredientsList.length ? ''
                                            : <small className="badge bg-info ms-2 fs-6">{ingredientsList.length}</small>
                                        }
                                    </th>
                                    <th className="col-md-2">Price (£)</th>
                                    <th className="col-md-2">Quantity</th>
                                    <th className="col-md-2">Unit</th>
                                    <th className="col-md-2">My Qties</th>
                                    <th className="col-md-1">£/Ingredient</th>
                                    <th className="col-md-1"></th>
                                </tr> 
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} 
                                        className="form-control text-center" type="text" required />
                                    </td>
                                    <td>
                                        <input value={price} onChange={(e) => setPrice(e.target.value)} 
                                        className="form-control text-center" type="number" min="0" step="0.1" required />
                                    </td>
                                    <td>
                                        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} 
                                        className="form-control text-center" type="number" min="0" step="0.1" required />
                                    </td>
                                    <td>
                                        <select className="form-select" aria-label="Default select example"
                                            onChange={(e) => setUnit(e.target.value)} value={unit}>
                                            <option value="g">G</option>
                                            <option value="kg">Kg</option>
                                            <option value="ml">Ml</option>
                                            <option value="ltr">Ltr</option>
                                            <option value="lb">Lb</option>
                                            <option value="cup">Cup</option>
                                            <option value="cup">Ea</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input value={myQuantity} onChange={(e) => setMyQuantity(e.target.value)} 
                                        className="form-control text-center" type="number" min="0" step="0.1" required />
                                    </td>
                                    <td>
                                        <input value={costPerIngredient} onChange={(e) => setCostPerIngredient(e.target.value)} 
                                        className="form-control text-center" type="text" readOnly />
                                    </td>
                                    <td>
                                        <Button type="submit" variant="contained" className="h-100" color="success">
                                            {ingredientBtn}
                                        </Button>
                                    </td>
                                </tr>
                                {
                                    ingredientsList.map((item, index) => {
                                        return <motion.tr key={index}
                                                className={`${item._id === ingredientId ? 'bg-warning' : ''}`}>
                                                <td className="col-md-3 text-capitalize">{item.ingredientName}</td>
                                                <td className="col-md-2">£{item.price.$numberDecimal}</td>
                                                <td className="col-md-2">{item.quantity.$numberDecimal} {item.unit}</td>
                                                <td className="col-md-1"></td>
                                                <td className="col-md-2">{item.myQuantity.$numberDecimal} {item.unit}</td>
                                                <td className="col-md-1">£{item.costPerIngredient.$numberDecimal}</td>
                                                <td className="col-md-1">
                                                    <div className="d-flex flex-row justify-content-between">
                                                        {
                                                            editingIngredient && item._id === ingredientId ?
                                                            <motion.div onClick={() => cancelEditIngredient(item._id)}
                                                            whileTap={{scale: 0.9}}>
                                                                <CancelIcon className="pointer text-danger" />
                                                            </motion.div>
                                                            :
                                                            <motion.div onClick={() => editIngredient(
                                                                item._id, item.ingredientName, item.price.$numberDecimal, 
                                                                item.quantity.$numberDecimal, item.unit, item.myQuantity.$numberDecimal, 
                                                                item.costPerIngredient.$numberDecimal
                                                            )}
                                                            whileTap={{scale: 0.9}}>
                                                                <EditIcon className="pointer text-success" />
                                                            </motion.div>
                                                        }
                                                        {
                                                            !editingIngredient &&
                                                            <motion.div onClick={() => deleteIngredient(item._id, item.ingredientName)}
                                                            whileTap={{scale: 0.9}}>
                                                                <DeleteIcon className="pointer text-danger" />
                                                            </motion.div>
                                                        }
                                                    </div>
                                                </td>
                                            </motion.tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CostingRecipeIngredients
