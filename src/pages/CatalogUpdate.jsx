import React, { useState } from 'react'
import AddProduct from '../components/AddProduct'
import Catalog from '../components/Catalog'
import AddCategory from '../components/AddCategory'
import ActionButtons from '../components/ActionButtons'
import AddPromotion from '../components/AddPromotion'

const CatalogUpdate = () => {
    const [updateCatalog, setUpdateCatalog] = useState(false)
    const [showModal, setShowModal] = useState('')
    return (
        <div className="container">
            <div className='d-flex flex-row align-items-center justify-content-between mt-4 w-100'>
                <h1>Les produits</h1>
                <ActionButtons showModal={(modal) => setShowModal(modal)} />
            </div>
            <hr>
            </hr>
            <Catalog update={updateCatalog} handleShowModal={(modal) => setShowModal(modal)} />
            {showModal === 'product' && <AddProduct handleClose={() => setShowModal('')} update={() => setUpdateCatalog(!updateCatalog)} />}
            {showModal === 'category' && <AddCategory handleClose={() => setShowModal('')} />}
            {typeof showModal === 'number' && <AddPromotion handleClose={() => setShowModal('')} productId={showModal} />}

        </div>
    )
}

export default CatalogUpdate