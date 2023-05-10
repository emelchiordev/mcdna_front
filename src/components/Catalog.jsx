import React, { useEffect, useState } from 'react'
import CatalogApi from '../services/CatalogApi'
import { IMAGE_URL } from '../services/config'
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';
import EditProduct from './EditProduct';


const Catalog = ({ update, handleShowModal }) => {

    const [products, setProducts] = useState([])
    const [updateProducts, setUpdateProducts] = useState(false)
    const [displaySpinner, setDisplaySpinner] = useState(false)
    const [deletingProductId, setDeletingProductId] = useState([])
    const [productIdEdit, setProductEdit] = useState('')
    const [showModal, setShowModal] = useState(false)

    // Gestion de la pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Récupération des produits lors du chargement du composant
    useEffect(() => {
        CatalogApi.getProducts().then(response => {
            if (response.status = 200) {
                setProducts(response.data['hydra:member'])

            }
        }).catch(error => {
        })
    }, [updateProducts, update])

    // Suppression d'un produit en fonction de son ID
    const handleRemove = (productId) => {
        setDeletingProductId([...deletingProductId, productId])
        CatalogApi.deleteProduct(productId).then(response => {
            if (response.status === 204) {
                setUpdateProducts(!updateProducts)
            }
        }).catch(error => {})
    }

    // Permet d'ouvrir la fenêtre modale afin d'éditer un produit
    const handleEditProduct = (productId) => {
        setShowModal(true)
        setProductEdit(productId)
    }

    // Permet d'ouvrir la fenêtre modal afin d'ajouter ou de modifier une promotion sur un produit
    const handleAddPromotion = (productId) => {
        handleShowModal(productId)
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
                {paginatedProducts.map(product => {
                    return (<tr key={product.id}>
                        <td><Avatar src={IMAGE_URL + product.imageName} size='50' /></td>
                        <th scope="row" style={{ verticalAlign: 'middle' }}>{product.label}</th>
                        <td style={{ verticalAlign: 'middle' }}>{product.description}</td>
                        <td style={{ verticalAlign: 'middle' }}>{product.category.libelle}</td>
                        <td style={{ verticalAlign: 'middle' }}>{product.price} €</td>
                        <td style={{ verticalAlign: 'middle' }} className='text-center'>
                            <span>
                                <button type="button" className="btn btn-warning" onClick={() => handleAddPromotion(product.id)}> <FontAwesomeIcon icon={faPercent} /> </button>
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


        {showModal && <EditProduct productId={productIdEdit} setShowModal={showModal} closeModal={() => setShowModal(false)} reloadProduct={() => setUpdateProducts(!updateProducts)} />}
        <nav className='navbar navbar-expand-lg navbar-custom justify-content-center'>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Précédent
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li
                        key={index}
                        className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""
                        }`}
                >
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Suivant
                    </button>
                </li>
            </ul>
        </nav>

    </>
    )
}

export default Catalog