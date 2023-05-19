import React from 'react'
import styled from 'styled-components'
import product from '../assets/homepage/mock/product1.jpg'

const ProductCard = ({ price, label, description, picture, percent_promo, promo, remised_price }) => {
    return (
        <Wrapper promo={promo}>
            {promo ? <>
                <div className='d-flex justify-content-between' style={{ maxHeight: '20px' }}>
                    <Promo>{promo && promo}</Promo>
                    <span className="badge rounded-pill text-bg-light d-flex justify-content-center align-items-center">
                        <PromoPercent>-{percent_promo && (Number.isInteger(parseInt(percent_promo)) ? parseInt(percent_promo).toFixed(0) : parseInt(percent_promo).toFixed(2)) + " %"}</PromoPercent>
                    </span>
                </div>
            </> : <div style={{ minHeight: '20px' }}></div>
            }
            <div className='d-flex justify-content-center'>
                <Picture src={picture ? picture : product} alt='picture 1'></Picture>
            </div>
            <div className=''>
                {promo ? <div>
                    <PromoPrice>
                        <span className='ms-2' >{remised_price} €</span>
                    </PromoPrice>
                    <div className='ms-2' style={{ "fontSize": "0.9rem" }}> au lieu de  {price} €</div></div> :
                    <Price>
                        <span className='ms-2'>{price ? price + ' €' : "2.50€"}</span>
                    </Price>

                }
            </div>
            <div className='ms-2'>
                <Label>
                    {label ? label : "test produit"}
                </Label>
            </div>
            <br></br>
            <Description className='ms-2'>
                {description ? description : "test produit"}
            </Description>
        </Wrapper >
    )
}
const Wrapper = styled.div`
width : 250px;
font-family:"maven_proregular";
height: 360px;
background-color:"#FFF";
border:${props => props.promo === "promo" ? "#fff0db 2px solid " : "#f7f7f7 3px solid "};
overflow:hidden;

`

const Picture = styled.img`
max-width:150px;
`

const Promo = styled.span`
color:var(--secondary-color);
transform: rotate(-45deg);
font-weight:bold;
margin-top:10px;
`
const PromoPercent = styled.span`
color:var(--secondary-color);
margin-top:2px;
font-weight:bold;
margin-right:2px;
`
const PromoPicture = styled.img`
max-width:150px;
`

const Label = styled.div`
font-weight:bold;
`
const Price = styled.div`
color:var(--primary-color);
font-size:1.5rem;
`
const PromoPrice = styled.div`
font-size:1.5rem;
color:red;
`

const Description = styled.div`

`

export default ProductCard