
'use server'
import { getMyToken } from "src/getMyToken"
import { CartData } from "src/types/CartData.type"

export async function getCartData() {
    const token = await getMyToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
            headers: {
                token: token
            }
        })
        const data: CartData = await res.json()
        return data
    }

}
export async function addProductToCart(id: string) {
    const token = await getMyToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
            method: "post",
            body: JSON.stringify({
                productId: id
            }),
            headers: {
                'content-type': "application/json",
                token: token
            }
        })
        const data = await res.json()

        return data
    } else {
        throw new Error("Cant add product to cart without login")
    }


}
export async function RemoveCartItem(id: string) {

    const token = await getMyToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
            method: "delete",
            headers: {
                token: token
            }
        })
        const data = await res.json()
        return data
    }



}
export async function clearCart() {

    const token = await getMyToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
            method: "delete",
            headers: {
                token: token
            }
        })
        const data = await res.json()
        return data
    }



}
export async function updateProductCount(id: string, count: number) {

    const token = await getMyToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
            method: "put",
            body: JSON.stringify({
                count: count
            }),
            headers: {
                'content-type': "application/json",
                token: token
            }
        })
        const data = await res.json()
        return data
    }
}