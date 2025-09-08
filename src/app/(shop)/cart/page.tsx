'use client'
import { AlertCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { clearCart, getCartData, RemoveCartItem, updateProductCount } from 'src/app/CartActions'
import { Alert, AlertTitle } from 'src/components/ui/alert'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { CountContext } from 'src/context/CountContext'

import { CartData, CartItem, ProductElement } from 'src/types/CartData.type'

export default function Cart() {

  const [CartData, setCartData] = useState<CartItem | null>(null)
  const countData = useContext(CountContext)
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    getAllCartData()
  }, [])


  async function getAllCartData() {
    const Cart: CartData | undefined = await getCartData()
    if (Cart) {
      setCartData(Cart.data)
    }
  }

  async function deleteProduct(id: string) {
    const data = await RemoveCartItem(id)
    console.log("remove", data);

    if (data.status == 'success') {
      toast.success("product deleted ", { position: "top-center" })
      const sum: number | undefined = data?.data.products.reduce((total: number, el: ProductElement) => {
        return total += el.count
      }, 0)

      if (sum) countData?.setNumberCart(sum)
      setCartData(data.data)
    }

  }
  async function clearCartItems() {
    const data = await clearCart()
    console.log(data);
    if (data.message == 'success') {
      toast.success("cart Deleted!", { position: "top-center" })
      getAllCartData()
      countData?.setNumberCart(0)
    }

  }
  async function updateCount(id: string, count: number) {


    setCount(count)
    const data = await updateProductCount(id, count)
    console.log("update", data);

    const sum: number | undefined = data?.data.products.reduce((total: number, el: ProductElement) => {
      return total += el.count
    }, 0)

    if (sum) countData?.setNumberCart(sum)
    if (data.status == 'success') {
      setCartData(data.data)
    }

  }

  return (

    <>

      {
        CartData?.products.length ? <>



          <Button onClick={clearCartItems} className='bg-red-600 p-5 rounded-3xl'>Clear All Cart</Button>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>

                {CartData?.products.map((product: ProductElement) => {
                  return <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <Image src={product.product.imageCover} width={100} height={100} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button onClick={() => updateCount(product.product._id, product.count -= 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button onClick={() => updateCount(product.product._id, product.count += 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price}
                    </td>

                    <td className="px-6 py-4">
                      <Button onClick={(() => deleteProduct(product.product._id))} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</Button>
                    </td>
                  </tr>
                })}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-16 py-3 text-black font-bold bg-gray-200" colSpan={4}>
                    TotalPrice
                  </td>
                  <td className='text-red-600'>{CartData?.totalCartPrice}</td>
                </tr>

              </tbody>
            </table>
          </div>



          <div className='flex justify-between w-1/2 p-5'>
            <Button className='bg-main'> <Link className='text-white' href={'/checkoutsession/' + CartData._id}>Checkout Session</Link></Button>
          </div>
        </> :
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Cart Empty</AlertTitle>

          </Alert>

      }




    </>


  )
}


// checkout Cash or visa
// number cartItem Navbar context
// product Vercal
// Redux 