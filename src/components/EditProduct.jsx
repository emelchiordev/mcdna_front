import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import CatalogApi from '../services/CatalogApi';
import CategoryApi from '../services/CategoryApi';
import Loading from './Loading';
import Avatar from 'react-avatar';
import { IMAGE_URL } from '../services/config';
import { array } from 'prop-types';

const EditProduct = ({ productId, setShowModal, closeModal, reloadProduct }) => {
    const [errorValidation, setErrorValidation] = useState({ title: "", description: "" })
    const [show, setShow] = useState(setShowModal);
    const [product, setProduct] = useState({ label: '', description: '', price: '' })
    const [updateProduct, setUpdateProduct] = useState()
    const [categories, setCategories] = useState([])
    const [update, setUpdate] = useState(false)
    const inputFileRef = useRef(null)
    const [sending, setSending] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')



    const handleSubmit = (e) => {
        e.preventDefault()
        setSending(true)
        const uriCategoryFactory = (product) => {
            if (Array.isArray(product.category) || typeof product.category === 'object') {
                return { ...product, category: "/api/categories/" + product.category.id }
            } else {
                return product
            }
        }
        delete product.discountPrice
        CatalogApi.updateProduct(product.id, uriCategoryFactory(product)).then(response => {
            setErrorValidation({})
            reloadProduct()
            setUpdate(!update)

        }).catch(error => {
            if (error.response.data['violations']) {
                const apiError = {}
                error.response.data['violations'].map(error => {
                    apiError[error.propertyPath] = error.message
                })
                setErrorValidation(apiError)
            }
            setSending(false)
        })
    }

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'imageFile':
                setProduct({ ...product, [event.target.name]: event.target.files[0] })
                break;
            case 'category':
                setProduct({ ...product, 'category': '/api/categories/' + event.target.value })
                setSelectedCategory(event.target.value)
                break;
            default:
                setProduct({ ...product, [event.target.name]: event.target.value })
        }
    }

    const handleClose = () => {
        closeModal()
    }


    useEffect(() => {
        if (productId !== undefined) {
            CatalogApi.getProduct(productId).then(res => {
                if (res.status === 200) {
                    setProduct(res.data)
                    setSelectedCategory(res.data.category.id)
                    setSending(false)

                }
            }).catch(error => setSending(false))

            CategoryApi.getCategories().then(response => {
                if (response.status === 200) {
                    setCategories(response.data["hydra:member"])
                }
            }).catch(error => {

            })
        }
    }, [update])


    return (
        <div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "block" : "none", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-0">
                    <div className="modal-header rounded-0" style={{ backgroundColor: '#007A3E', color: "white" }}>
                        <h5 className="modal-title">Editer un produit</h5>
                        <button type="button" className="btn-close text-bg-light" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label htmlFor="label" className="form-label">Libellé</label>
                                <input type="text" className="form-control" id="label" name="label" value={product.label} required onChange={handleChange} />
                                {errorValidation.label && <p className='invalid-feedback d-block'>{errorValidation.label}</p>}

                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="description" rows="3" value={product.description} onChange={handleChange} ></textarea>
                                {errorValidation.description && <p className='invalid-feedback d-block'>{errorValidation.description}</p>}

                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Prix</label>
                                <input type="text" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} />
                                {errorValidation.price && <p className='invalid-feedback d-block'>{errorValidation.price}</p>}

                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Catégorie</label>
                                <select className="form-select" id="category" name="category" value={selectedCategory} onChange={handleChange}>
                                    <option value="">Sélectionner une catégorie</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}
                                        >
                                            {category.libelle}
                                        </option>
                                    ))}
                                </select>
                                {errorValidation.category && <p className='invalid-feedback d-block'>{errorValidation.category}</p>}
                            </div>

                            <div>
                                <h3>Image stockée :</h3>
                                <Avatar src={IMAGE_URL + product.imageName} size='100' />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control-file" id="image" name="imageFile" accept="image/*" ref={inputFileRef} onChange={handleChange} />
                                {errorValidation.imageFile && <p className='invalid-feedback d-block'>{errorValidation.imageFile}</p>}

                            </div>
                            <div className="d-grid gap-2">
                                <Button type="submit" className="btn w-25 m-auto" onChange={handleSubmit} >
                                    Mettre à jour {sending && <Loading />}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" style={{ backgroundColor: "#FFAE3B", color: 'white', borderRadius: '30px' }} data-bs-dismiss="modal" onClick={handleClose}>
                            Annuler
                        </button>
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

export default EditProduct