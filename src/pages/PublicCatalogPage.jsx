import React, { useState, useEffect } from 'react'
import CatalogApi from '../services/CatalogApi'
import ProductCard from '../components/ProductCard'
import CategoryApi from '../services/CategoryApi'
import { IMAGE_URL } from '../services/config'
import Catalog from '../loaders/Catalog'


const PublicCatalogPage = () => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        CatalogApi.getProducts().then(res => {
            if (res.status === 200) {
                setProducts(res.data['hydra:member'])
                setLoading(false)
                setFilteredProducts(res.data['hydra:member'])
            }

            return () => {
                setProducts([])
                setCategories([])
                setFilteredProducts([])
            }
        }).catch(error => console.log(error))

        CategoryApi.getCategories().then(res => {
            if (res.status === 200) {
                setCategories(res.data['hydra:member'])
            }
        }).catch(error => console.log(error))
    }, [])

    const handleChange = event => {
        if (event.target.value !== '') {
            setFilteredProducts(products.filter(product => product.category.id == event.target.value))
        } else {
            setFilteredProducts(products)
        }
    }


    return (
        <div className='container'>
            <div className='d-flex justify-content-between mt-3  m-auto'>
                <h1>Nos Produits</h1>
                <div className='d-flex align-items-center'>
                    <select className="form-select rounded-pill" aria-label="Catégories" onChange={handleChange}>
                        <option value='' defaultValue>Rayon</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.libelle}</option>
                        ))}
                    </select>
                </div>

            </div>
            <div className='d-flex flex-wrap justify-content-center mt-3'>
                {!loading && filteredProducts.map(product => {
                    return (
                        <ProductCard
                            key={product.id}
                            picture={IMAGE_URL + product.imageName}
                            promo={product.discountPrice !== null && "promo"}
                            label={product.label}
                            price={product.price}
                            description={product.description}
                            remised_price={product.discountPrice !== null && (product.discountPrice[0]).toFixed(2)}
                            percent_promo={product.discountPrice !== null && product.discountPrice[1]}
                        />
                    )
                })}
            </div>
            {loading && <Catalog />}
        </div>
    )
}

export default PublicCatalogPage