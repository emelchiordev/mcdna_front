import React from 'react'
import styled from 'styled-components'
import discount from '../assets/homepage/discount.png'
import newproduct from '../assets/homepage/newproduct.png'
import PromoCard from '../components/PromoCard'
import ProductCard from '../components/ProductCard'

const Homepage = () => {

    const mock_data = [
        {
            id: 1,
            percent_promo: "30%",
            price_discount: "2.70",
            price: "5.70",
            image: "../assets/homepage/mock/discitem1.jpg",
            label: "Madeleines - St Michel",
            description: ""
        },
        {
            id: 2,
            percent_promo: "30%",
            price_discount: "2.70",
            price: "5.70",
            image: "../assets/homepage/mock/discitem2.jpg",
            label: "Madeleines - St Michel",
            description: ""
        },
        {
            id: 3,
            percent_promo: "30%",
            price_discount: "2.70",
            price: "5.70",
            image: "../assets/homepage/mock/discitem3.jpg",
            label: "Madeleines - St Michel",
            description: ""
        },
        {
            id: 4,
            percent_promo: "30%",
            price_discount: "2.70",
            price: "5.70",
            image: "../assets/homepage/mock/discitem4.jpg",
            label: "Madeleines - St Michel",
            description: ""
        },
        {
            id: 5,
            percent_promo: "30%",
            price_discount: "2.70",
            price: "5.70",
            image: "../assets/homepage/mock/discitem5.jpg",
            label: "Madeleines - St Michel",
            description: ""
        }
    ]



    return (
        <>
            <WrapperPromotion>
                <div className='container pb-4'>
                    <div className='d-flex align-items-center pt-4'>
                        <img src={discount} alt='icone promotion' width="40px" />
                        <span className="title"> Nos promotions en cours</span>
                    </div>
                    <div className='d-flex mt-4 mb-4 justify-content-around flex-wrap'>
                        {mock_data.map(product =>
                        (<PromoCard
                            key={product.id}
                            percent_promo={product.percent_promo}
                            price_discount={product.price_discount}
                            image={product.image}
                            price={product.price}
                            label={product.label}
                        />)
                        )}
                    </div>
                </div>
            </WrapperPromotion>
            <WrapperProduct>
                <div className='container pb-4'>
                    <div className='d-flex align-items-center pt-4'>
                        <img src={newproduct} alt='icone promotion' width="40px" />
                        <span className="title"> Nos nouveautés</span>
                    </div>

                    <div className='d-flex flex-wrap justify-content-center'>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />

                    </div>

                </div>
            </WrapperProduct>
        </>
    )
}

const WrapperPromotion = styled.div`
    width:100%;
    background-color:#f7f7f7;
`

const WrapperProduct = styled.div`

`


export default Homepage