import React, { useEffect, useState } from 'react'
import CatalogApi from '../services/CatalogApi'
import { IMAGE_URL } from '../services/config'
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';
import EditProduct from './EditProduct';


const Catalog = () => {

    const [products, setProducts] = useState([])
    const [updateProducts, setUpdateProducts] = useState(false)
    const [displaySpinner, setDisplaySpinner] = useState(false)
    const [deletingProductId, setDeletingProductId] = useState([])
    const [productIdEdit, setProductEdit] = useState('')
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        CatalogApi.getProducts().then(response => {
            if (response.status = 200) {
                setProducts(response.data['hydra:member'])
            }
        }).catch(error => {
        })
    }, [updateProducts])

    // Suppression d'un produit
    const handleRemove = (productId) => {
        setDeletingProductId([...deletingProductId, productId])
        CatalogApi.deleteProduct(productId).then(response => {
            if (response.status === 204) {
                setUpdateProducts(!updateProducts)
            }
        }).catch(error => console.log(error))
    }

    const handleEditProduct = (productId) => {
        setShowModal(true)
        setProductEdit(productId)
    }


    return (<>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Description</th>
                    <th scope="col">Catégorie</th>
                    <th scope="col">Prix</th>
                    <th scope="col" className='text-center'>Promotion</th>
                    <th scope="col" className='text-center'>Mettre à jour</th>
                    <th scope="col" className='text-center'>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => {
                    return (<tr key={product.id}>
                        <td><Avatar src={IMAGE_URL + product.imageName} size='50' /></td>
                        <th scope="row" style={{ verticalAlign: 'middle' }}>{product.label}</th>
                        <td style={{ verticalAlign: 'middle' }}>{product.description}</td>
                        <td style={{ verticalAlign: 'middle' }}>{product.category.libelle}</td>
                        <td style={{ verticalAlign: 'middle' }}>{product.price} €</td>
                        <td style={{ verticalAlign: 'middle' }} className='text-center'>
                            <span>
                                <button type="button" className="btn btn-warning"> <FontAwesomeIcon icon={faPercent} /> </button>
                            </span>

                        </td>
                        <td style={{ verticalAlign: 'middle' }} className='text-center'><button type="button" className="btn btn-warning" onClick={() => handleEditProduct(product.id)}><FontAwesomeIcon icon={faPen} /> </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }} className='text-center'>{deletingProductId.includes(product.id) ? <button type="button" className="btn btn-warning"  ><Spinner /> </button> : <button type="button" className="btn btn-warning" onClick={() => handleRemove(product.id)}><FontAwesomeIcon icon={faTrash} /> </button>}
                            <span>

                            </span>
                        </td>
                    </tr>)
                })}



            </tbody>
        </table>

        {showModal && <EditProduct productId={productIdEdit} setShowModal={showModal} closeModal={() => setShowModal(false)} />}


    </>
    )
}

export default Catalog