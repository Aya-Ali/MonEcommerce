
import { Button } from 'src/components/ui/button'
import { ProductDetails } from 'src/types/productDetails.type'

import React from 'react'
import ProductSlider from './../ProductSlider/ProductSlider';
import ProductBtn from '../ProductBtn/ProductBtn';


export default function ProductDetailsCard({ product }: { product: ProductDetails }) {

    const { category: { name }, title, description, price, ratingsAverage, images ,_id} = product
    return (
        <div className='flex items-center '>
            <div className='w-1/4'>
                <ProductSlider images={images} />
            </div>
            <div className='w-3/4'>
                <h1>{title}</h1>
                <h2 className='text-main my-5'>{name}</h2>
                <p>{description}</p>
                <div className='flex justify-between my-5'>
                    <span>{price} EGP</span>
                    <span>{ratingsAverage}<i className='fa-solid fa-star rating-color '></i></span>
                </div>

                <ProductBtn id={_id}/>
            </div>
        </div>
    )
}
