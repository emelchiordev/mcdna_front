import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import discount from '../assets/homepage/discount.png'
import newproduct from '../assets/homepage/newproduct.png'
import PromoCard from '../components/PromoCard'
import ProductCard from '../components/ProductCard'
import CatalogApi from '../services/CatalogApi'
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
                                promo={product.discountPrice !== null && "promo"}
                                label={product.label}
                                price={product.price}
                                description={product.description}
                                remised_price={product.discountPrice !== null && (product.discountPrice[0]).toFixed(2)}
                                percent_promo={product.discountPrice !== null && product.discountPrice[1]}
                            />
                        )
                        )}
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


export default Homepage