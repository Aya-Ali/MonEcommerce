'use client'
import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image';
export default function ProductSlider({ images }: { images: string[] }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    };
    return (
        <Slider {...settings} className="w-3/4 ">
            {
                images.map((image, i) => {
                    return <div key={i} >
                        <Image src={image} alt="img1" width={1000} height={200} className="w-full object-cover  " />
                    </div>

                })
            }

        </Slider>
    )
}
