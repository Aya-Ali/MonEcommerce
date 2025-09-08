'use client'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getCartData } from "src/app/CartActions";
import { CartData, ProductElement } from "src/types/CartData.type";

type contextType = {
    numCart: number,
    setNumberCart: Dispatch<SetStateAction<number>>
}
export const CountContext = createContext<contextType | null>(null)


export default function CountProvider({ children }: { children: React.ReactNode }) {

    const [numCart, setNumberCart] = useState<number>(0)
    useEffect(() => { getUserCart() }, [])

    async function getUserCart() {
        const data: CartData | undefined = await getCartData()
        const sum: number | undefined = data?.data.products.reduce((total: number, el: ProductElement) => {
            return total += el.count
        }, 0)

        if (sum) setNumberCart(sum)
    }
    return <CountContext.Provider value={{ numCart, setNumberCart }}>
        {children}
    </CountContext.Provider>

}

// 1 token refresh data
// login data set

// setCount remove , clear ,update ,add login , refresh