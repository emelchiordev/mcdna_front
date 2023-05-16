import React from 'react'
import styled from 'styled-components'



const PromoCard = ({ percent_promo, price_discount, price, label, picture }) => {
    return (
        <Wrapper>
            <div className='d-flex justify-content-between'>
                <Promo>promo</Promo>
                <PromoPercent>-{percent_promo && (Number.isInteger(parseInt(percent_promo)) ? parseInt(percent_promo).toFixed(0) : parseInt(percent_promo).toFixed(2)) + " %"}</PromoPercent>
            </div>
            <div className='d-flex justify-content-center'>
                <PromoPicture src={picture} alt='picture 1'></PromoPicture>
            </div>
            <div className=''>
                <span className='ms-2' style={{ "color": "red", "fontWeight": "bold" }}>{parseFloat(price_discount).toFixed(2)} €</span>
                <span style={{ "fontSize": "0.9rem" }}> au lieu de  {price}€</span>
            </div>
            <div className='ms-2'>
                {label}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
margin:1rem;
width : 220px;
font-family:"maven_proregular";
height: 270px;
background-color:#FFF;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`
const Promo = styled.span`
color:var(--secondary-color);
transform: rotate(-45deg);
margin-top:10px;
`
const PromoPercent = styled.span`
color:var(--secondary-color);
margin-top:2px;
margin-right:2px;
`
const PromoPicture = styled.img`
max-width:150px;
`


export default PromoCard