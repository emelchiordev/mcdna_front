import React from 'react'
import styled from 'styled-components'
import AddCategory from './AddCategory'

const ActionButtons = ({ showModal }) => {

    const handleShowModal = (event) => {
        switch (event.target.name) {
            case 'product': showModal(event.target.name)
                break;
            case 'category': showModal(event.target.name)
                break;
        }
    }

    return (

        <div className='d-flex flex-row justify-content-end'>
            <Button variant="primary" onClick={handleShowModal} name="category" style={{ marginRight: '10px' }}>
                Ajouter une catégorie
            </Button>

            <div className='d-flex justify-content-around'>

                <Button variant="primary" name="product" onClick={handleShowModal}>
                    Ajouter un produit
                </Button>
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
`

export default ActionButtons