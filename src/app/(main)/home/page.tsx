
import HomeLoading from 'src/app/_component/HomeLoading/HomeLoading'
import MainSlider from 'src/app/_component/MainSlider/MainSlider'
import ProductCard from 'src/app/_component/ProductCard/ProductCard'
import { GetAllProducts } from 'src/services/product.s'

import { ProductData, productItem } from 'src/types/Product.type'
import React, { Suspense } from 'react'


export default async function page() {

  const res: ProductData = await GetAllProducts()



  return (
    <div>

      <MainSlider />

      <h1>Home</h1>

      <Suspense fallback={<HomeLoading />}>

        <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3'>

          {res?.data.map((product: productItem) => {
            return <ProductCard key={product._id} product={product} />
          })}

        </div>
      </Suspense>
    </div>
  )
}
