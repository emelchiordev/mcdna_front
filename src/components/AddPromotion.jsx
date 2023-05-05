import React, { useState } from 'react'

const AddPromotion = ({ handleClose, productId }) => {
    const [percentage, setPercentage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        // envoyer les données du formulaire au serveur
    }

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
                                <div className="form-group">
                                    <label>Pourcentage de promotion :</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Entrez le pourcentage de promotion"
                                        value={percentage}
                                        onChange={(e) => setPercentage(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Date de début :</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Entrez la date de début"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Date de fin :</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Entrez la date de fin"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Enregistrer
                                </button>
                            </form>
                        </div>
                        <hr></hr>
                        <h1>Les promotions</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Libellé</th>
                                    <th scope="col">Mettre à jour</th>
                                    <th scope="col">Supprimer</th>

                                </tr>
                            </thead>
                            <tbody>


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

export default AddPromotion