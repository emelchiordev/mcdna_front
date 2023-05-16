import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import discount from '../assets/homepage/discount.png'
import newproduct from '../assets/homepage/newproduct.png'
import PromoCard from '../components/PromoCard'
import ProductCard from '../components/ProductCard'
import CatalogApi from '../services/CatalogApi'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../services/config'

const Homepage = () => {

    const [productsPromotion, setProductsPromotion] = useState([])
    const [paginatedProducts, setPaginatedProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        CatalogApi.getProductsWithPaginatedActivePromotion().then(res => {
            if (res.status === 200) {
                setProductsPromotion(res.data['hydra:member'])
            }
        }).catch(error => console.log(error))

        CatalogApi.getPaginatedProduct().then(res => {
            if (res.status === 200) {
                setPaginatedProducts(res.data['hydra:member'])
            }
        }).catch(error => console.log(error))

        return () => {
            setProductsPromotion([])
            setCategories([])
        }
    }, [])


    return (
        <div style={{ minHeight: '75vh' }}>
            <WrapperPromotion>
                <div className='container pb-4'>
                    <div className='d-flex align-items-center pt-4'>
                        <img src={discount} alt='icone promotion' width="40px" />
                        <span className="title"> Nos promotions en cours</span>
                    </div>
                    <div className='d-flex mt-4 mb-4 justify-content-around flex-wrap'>
                        {productsPromotion.map(product =>
                        (<PromoCard
                            key={product.id}
                            percent_promo={product.discountPrice[1]}
                            price_discount={product.discountPrice[0]}
                            picture={IMAGE_URL + product.imageName}
                            price={product.price}
                            label={product.label}
                        />)
                        )}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Link to="/promotions" className="nav-link" href="#">             <Button>Voir tout</Button></Link>
                    </div>
                </div>
            </WrapperPromotion>
            <WrapperProduct>
                <div className='container pb-4'>
                    <div className='d-flex align-items-center pt-4'>
                        <img src={newproduct} alt='icone promotion' width="40px" />
                        <span className="title"> Nos nouveautés</span>
                    </div>

                    <div className='d-flex mt-4 mb-4  flex-wrap justify-content-center'>
                        {paginatedProducts.map(product =>
                        (
                            <ProductCard
                                key={product.id}
                                picture={IMAGE_URL + product.imageName}
                                promo={product.discountPrice !== undefined && "promo"}
                                label={product.label}
                                price={product.price}
                                description={product.description}
                                remised_price={product.discountPrice !== undefined && (product.discountPrice[0]).toFixed(2)}
                                percent_promo={product.discountPrice !== undefined && product.discountPrice[1]}

                            />

                        )
                        )}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Link to="/catalogue" className="nav-link" href="#"><Button alternative>Voir notre catalogue</Button></Link>
                    </div>
                </div>
            </WrapperProduct>
        </div>
    )
}

const WrapperPromotion = styled.div`
    width:100%;
    background-color:#f7f7f7;
`

const WrapperProduct = styled.div`

`
const Button = styled.button`
background-color:${props => props.alternative ? '#FFFFFF' : '#007A3E'} ;
font-size:1.2rem;
color: ${props => props.alternative ? '#007A3E' : 'white'};
border: ${props => props.alternative ? 'solid 1px' : 'none'};
border-color:${props => props.alternative ? '#007A3E' : 'none'};
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
  background-color: ${props => props.alternative ? '#ebfff5' : '#006331'};
}
&:active {
  transform: translateY(2px);
}
`


export default Homepage