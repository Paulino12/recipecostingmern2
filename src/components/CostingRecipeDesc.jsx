import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import { RecipesContext } from '../contexts/RecipesContext'
import { NotificationsContext } from '../contexts/NotificationsContext'

function CostingRecipeDesc({ recipeId, recipeName }) {

    const { url,
        isLoading, setIsLoading,
        recipeDesc, setRecipeDesc
     } = useContext(RecipesContext)

    const {
        setNotification, setShowNotification
    } = useContext(NotificationsContext)

    const [showEditInput, setShowEditInput] = useState(false)
    const [newRecipeDesc, setNewRecipeDesc] = useState([])

    useEffect(() => {
        axios.get(`${url}/recipes/${recipeId}`)
        .then((response) => {
            setNewRecipeDesc(response.data)
            setIsLoading(false)
        })
        .catch((error) => { console.log(error) })
        console.log("desc");
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [recipeId, isLoading, newRecipeDesc.recipeDescription])

    const recipeDate = new Date(newRecipeDesc.createdAt)

    const handleEditRecipeDesc = () => {
        setShowEditInput(true)
        setRecipeDesc(newRecipeDesc.recipeDescription)
    }

    // Update recipe description
    const updateRecipeDesc = () => {
        setIsLoading(true)
        axios.put(`${url}/recipes/${recipeId}`, { recipeDescription: recipeDesc })
            .then((response) => {
                setNewRecipeDesc(response.data)
                setShowNotification(true)
                setNotification(`${recipeName}'s description successfully updated`)
                setShowEditInput(false)
            })
            .catch((error) => { console.log(error) })
    }

    return (
        <div className="container mb-3">
            <div className="row d-flex flex-row">
                <div className="col-sm-12 col-md-3">
                    <div className="card shadow px-3 h-100">
                        <h4 className="card-title text-capitalize pt-2 mb-0 d-inline">{recipeName}</h4>
                        <small className="text-muted">
                            Created on: {recipeDate.toLocaleString("en-GB", {timeZone: "Europe/London",})}
                        </small>
                    </div>
                </div>
                
                <div className="col-sm-12 col-md-9">
                    <div className="card shadow">
                        <div className="card-header d-flex flex-row justify-content-between">
                            <div>
                                <h5>Brief Description</h5>
                            </div>
                            <div>
                                {
                                    showEditInput ?
                                    <div className="d-flex flex-row">
                                        <motion.div onClick={() => setShowEditInput(false)}
                                        whileTap={{scale: 0.9}} 
                                        className='pointer p-0 text-danger me-2'
                                        >
                                            <CancelIcon />
                                        </motion.div>
                                        <motion.div onClick={updateRecipeDesc}
                                        whileTap={{scale: 0.9}} 
                                        className='pointer p-0 text-success'
                                        >
                                            <SaveIcon />
                                        </motion.div>
                                    </div>
                                    :
                                    <motion.div onClick={handleEditRecipeDesc}
                                    whileTap={{scale: 0.9}} 
                                    className='pointer p-0'
                                    >
                                        <EditIcon />
                                    </motion.div>
                                }
                            </div>
                        </div>
                        {
                            showEditInput ?
                            <div className="card-body d-flex flex-row justify-content-between">
                                <div className="w-100">
                                    <CKEditor 
                                    editor={ ClassicEditor }
                                    data={recipeDesc}
                                    onChange={ ( e, editor ) => {
                                        const data = editor.getData();
                                        setRecipeDesc(data)
                                    } }
                                    />
                                </div>
                                
                            </div>
                            :
                            <div className="card-body d-flex flex-row justify-content-between">
                                <div>
                                    {
                                        newRecipeDesc.recipeDescription === "" ? 
                                        <span className="badge bg-info fs-4">This recipe has no Brief description</span>
                                        :
                                        <div dangerouslySetInnerHTML={{ __html: newRecipeDesc.recipeDescription}} ></div>
                                    }
                                </div>
                                
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CostingRecipeDesc
