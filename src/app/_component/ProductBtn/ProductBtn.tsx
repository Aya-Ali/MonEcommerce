'use client'

import { useContext } from 'react'
import { toast } from 'sonner'
import { addProductToCart } from 'src/app/CartActions'
import { Button } from 'src/components/ui/button'
import { CountContext } from 'src/context/CountContext'
import { ProductElement } from 'src/types/CartData.type'

export default function ProductBtn({ id }: { id: string }) {

    const countData = useContext(CountContext)
    async function addProduct(id: string) {
    
          try{
              const data = await addProductToCart(id)
            if (data.status == 'success') {
                const sum: number | undefined = data?.data.products.reduce((total: number, el: ProductElement) => {
                    return total += el.count
                }, 0)

                if (sum) countData?.setNumberCart(sum)
                toast.success(data.message, { position: "top-center" })
            } else {
                toast.error("Id incorrect", { position: "top-center" })
            }
          }catch(err){
            console.log(err);
            
          }
      
    }

    return (
        <Button className='w-full bg-main ' onClick={() => addProduct(id)}>Add To Cart</Button>

    )
}
