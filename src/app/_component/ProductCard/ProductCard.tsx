import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "src/components/ui/card"
import Image from 'next/image'
import { Button } from 'src/components/ui/button'

import { productItem } from 'src/types/Product.type'
import Link from 'next/link'
import ProductBtn from '../ProductBtn/ProductBtn'

export default function ProductCard({ product }: { product: productItem }) {
    const { imageCover, _id, title, category: { name }, price, ratingsAverage } = product
    return (
        <Card className='bg-gray-100 my-7'>
            <Link href={'/home/' + _id}>
                <CardHeader>
                    <Image src={imageCover} alt={title} className='w-full' width={100} height={100} />
                </CardHeader>
                <CardContent>

                    <h2 className='text-main'>{name}</h2>
                    <h1>{title.split(" ").slice(0, 2).join(" ")}</h1>
                    <div className='flex justify-between'>
                        <span>{price}EGP</span>
                        <span>{ratingsAverage}<i className='fa-solid fa-star rating-color '></i></span>
                    </div>
                </CardContent>

            </Link>
            <CardFooter>
                <ProductBtn id={_id} />
            </CardFooter>
        </Card>
    )
}
