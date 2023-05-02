import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CategoryApi from '../services/CategoryApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';

const AddCategory = () => {

    const [show, setShow] = useState(false)
    const [update, setUpdate] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [category, setCategory] = useState({ libelle: "" })
    const [categories, setCategories] = useState([])
    const [categoryUpdate, setCategoryUpdate] = useState({ libelle: "" })
    const [errorValidation, setErrorValidation] = useState({ libelle: '' })


    const handleChange = (event) => {
        setCategory({ [event.target.name]: event.target.value })
    }

    useEffect(() => {
        CategoryApi.getCategories().then(response => {
            if (response.status === 200) {
                setCategories(response.data["hydra:member"])
                setErrorValidation({})

            }
        }).catch(error => {

        })
    }, [update])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorValidation({})
        CategoryApi.setCategory(category).then(response => {
            if (response.status === 201) {
                setUpdate(!update)
            }
        }).catch(error => {

            if (error.response.data['violations']) {
                const apiError = {}
                error.response.data['violations'].map(error => {
                    apiError[error.propertyPath] = error.message
                })
                setErrorValidation(apiError)
            }
        })
    }

    const handleRemove = (categorie) => {
        CategoryApi.deleteCategory(categorie).then(response => {
            if (response.status === 204) {
                setUpdate(!update)
            }
        }).catch(error => console.log(error))
    }

    const handleChangeUpdate = (event) => {
        setCategoryUpdate({ [event.target.name]: event.target.value, id: event.target.id })

    }
    const handleUpdate = () => {
        CategoryApi.updateCategory(categoryUpdate.id, categoryUpdate).then(response => {
            setUpdate(!update)
        }).catch(error => console.log(error))
    }

    return (

        <div className="mb-3">
            <div className='d-flex justify-content-between'>

                <Button variant="primary" onClick={handleShow} style={{ marginRight: '10px' }}>
                    Ajouter une catégorie
                </Button>
            </div>


            <div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "block" : "none", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-0">
                        <div className="modal-header rounded-0" style={{ backgroundColor: '#007A3E', color: "white" }}>
                            <h5 className="modal-title">Ajouter une catégorie</h5>
                            <button type="button" className="btn-close text-bg-light" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="label" className="form-label">
                                        Libellé
                                    </label>
                                    <input type="text" className="form-control" id="label" name='libelle' value={category.label} onChange={handleChange} />
                                    {errorValidation.libelle && <p className='invalid-feedback d-block'>{errorValidation.libelle}</p>}

                                </div>
                                <Button type="submit" className="btn btn-primary m-auto" onClick={handleSubmit}>
                                    AJOUTER
                                </Button>
                            </form>
                            <hr></hr>
                            <h1>Les catégories</h1>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Libellé</th>
                                        <th scope="col">Mettre à jour</th>
                                        <th scope="col">Supprimer</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(categorie => {
                                        return (
                                            <tr key={categorie.id}>
                                                <td>
                                                    <div className='input-group'>
                                                        <input type='text' className="form-control" style={{ border: '0' }} name='libelle' id={categorie.id} defaultValue={categorie.libelle} onChange={handleChangeUpdate}></input>
                                                    </div>
                                                </td>
                                                <td className='text-center'>
                                                    <FontAwesomeIcon icon={faFloppyDisk} onClick={() => handleUpdate(categorie.id)} />
                                                </td>
                                                <td className='text-center' onClick={() => handleRemove(categorie.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" style={{ backgroundColor: "#FFAE3B", color: 'white', borderRadius: '30px' }} data-bs-dismiss="modal" onClick={handleClose}>
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

const Button = styled.button`
background-color: #007A3E;
color: white;
border: none;
padding-bottom: 5px;
padding-top:5px;
padding-left:10px;
padding-right:10px;
border-radius: 30px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.2s ease-in-out;
&:hover {
  background-color: #006331;
}
&:active {
  transform: translateY(2px);
}
`;

export default AddCategory