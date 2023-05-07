import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import PromotionService from '../services/PromotionService'
import styled from 'styled-components'

const AddPromotion = ({ handleClose, productId }) => {
    const [promotions, setPromotions] = useState([])
    const [promotion, setPromotion] = useState({ percentage: "", startDate: "", endDate: "", products: "/api/products/" + productId })
    const [reloadData, setReloadData] = useState(false)
    const [errorValidation, setErrorValidation] = useState({ libelle: '' })

    // envoi les données du formulaire au serveur
    const handleSubmit = (event) => {
        event.preventDefault()
        setErrorValidation({})
        PromotionService.setPromotion(promotion).then(res => {
            if (res.status === 201) {
                setReloadData(!reloadData)
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

    const handleChange = (event) => {
        setPromotion({ ...promotion, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        PromotionService.getPromotion(productId).then((response) => {
            if (response.status === 200) {
                setPromotions(response.data["hydra:member"])
            }
        }).catch(error => console.log(error))
    }, [reloadData])



    return (
        <div className="mb-3">
            <div className={`modal fade show`} style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-0">
                        <div className="modal-header rounded-0" style={{ backgroundColor: '#007A3E', color: "white" }}>
                            <h5 className="modal-title">Ajouter une promotion</h5>
                            <button type="button" className="btn-close text-bg-light" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label>Pourcentage de promotion :</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Entrez le pourcentage de promotion"
                                        name="percentage"
                                        value={promotion.percentage}
                                        onChange={handleChange}
                                    />
                                    {errorValidation.percentage && <p className='invalid-feedback d-block'>{errorValidation.percentage}</p>}
                                </div>

                                <div className="form-group mb-3">
                                    <label>Date de début :</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Entrez la date de début"
                                        name="startDate"
                                        value={promotion.startDate}
                                        onChange={handleChange}
                                    />
                                    {errorValidation.startDate && <p className='invalid-feedback d-block'>{errorValidation.startDate}</p>}

                                </div>

                                <div className="form-group mb-3">
                                    <label>Date de fin :</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Entrez la date de fin"
                                        name="endDate"
                                        value={promotion.endDate}
                                        onChange={handleChange}
                                    />
                                    {errorValidation.endDate && <p className='invalid-feedback d-block'>{errorValidation.endDate}</p>}

                                </div>

                                <Button type="submit" className="btn w-25 m-auto">
                                    Enregistrer
                                </Button>
                            </form>
                        </div>
                        <hr></hr>
                        <h1>Les promotions</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className='text-center'>Pourcentage</th>
                                    <th scope="col" className='text-center'>Date de début</th>
                                    <th scope="col" className='text-center'>Date de fin</th>

                                </tr>
                            </thead>
                            <tbody>
                                {promotions.map(promotion => {
                                    return (
                                        <tr key={promotion.id}>
                                            <td className='text-center' scope='col'>{promotion.percentage} </td>
                                            <td className='text-center' scope='col'>{moment(promotion.startDate).format('DD/MM/YYYY')} </td>
                                            <td className='text-center' scope='col'>{moment(promotion.endDate).format('DD/MM/YYYY')} </td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
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
}`

export default AddPromotion