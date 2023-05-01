import React, { useEffect, useState } from 'react'
import CatalogApi from '../services/CatalogApi'
import { IMAGE_URL } from '../services/config'
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Catalog = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        CatalogApi.getProduct().then(response => {
            if (response.status = 200) {
                setProducts(response.data['hydra:member'])
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Description</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Outils</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => {
                    return (<tr key={product.id}>
                        <td><Avatar src={IMAGE_URL + product.imageName} size='50' /></td>
                        <th scope="row" style={{ verticalAlign: 'middle' }}>{product.label}</th>
                        <td style={{ verticalAlign: 'middle' }}>{product.description}</td>
                        <td style={{ verticalAlign: 'middle' }}>{product.price} €</td>
                        <td style={{ verticalAlign: 'middle' }}>
                            <span>
                                <button type="button" className="btn btn-warning">Promotions  <FontAwesomeIcon icon={faPercent} /> </button>
                            </span>

                            <span><FontAwesomeIcon icon={faTrash} /></span>
                        </td>
                    </tr>)
                })}



            </tbody>
        </table>
    )
}

export default Catalog