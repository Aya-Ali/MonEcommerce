
import ProductDetailsCard from 'src/app/_component/ProductDetailsCard/ProductDetailsCard'
import { GetProductDetails } from 'src/services/product.s'
import { ProductDetails } from 'src/types/productDetails.type'
import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
    const { id } = await params
    const data = await GetProductDetails(id)

    const ProductDetails: ProductDetails = data.data
    return (
        <div>
            <ProductDetailsCard product={ProductDetails} />
        </div>
    )
}
