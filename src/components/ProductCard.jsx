import React from 'react'
import styled from 'styled-components'
import product from '../assets/homepage/mock/product1.jpg'

const ProductCard = ({ price, label, description }) => {
    return (
        <Wrapper>
            <div className='d-flex justify-content-between'>
            </div>
            <div className='d-flex justify-content-center'>
                <Picture src={product} alt='picture 1'></Picture>
            </div>
            <div className=''>
                <span className='ms-2' style={{ "fontWeight": "bold" }}>2.50€</span>
            </div>
            <div className='ms-2'>
                test product
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
width : 200px;
font-family:"maven_proregular";
height: 250px;
background-color:#FFF;
border:1px solid #f7f7f7;
`

const Picture = styled.img`
max-width:150px;
`

export default ProductCard