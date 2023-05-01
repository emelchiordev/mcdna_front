import React from 'react'
import AddProduct from '../components/AddProduct'
import Catalog from '../components/Catalog'
import AddCategory from '../components/AddCategory'

const CatalogUpdate = () => {
    return (
        <div className="container">
            <div className='d-flex flex-row align-items-center justify-content-between mt-4 w-100'>
                <h1>Les produits</h1>
                <div className='d-flex flex-row justify-content-end'>
                    <AddCategory />
                    <AddProduct />

                </div>
            </div>

            <hr>
            </hr>

            <Catalog />
        </div>
    )
}

export default CatalogUpdate