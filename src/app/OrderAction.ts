'use server'

import { getMyToken } from "src/getMyToken"

export async function checkoutPaymentSession(cartID: string, shippingData: { details: string, phone: string, city: string }) {
    const token = await getMyToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartID}?url=${process.env.NEXT_PUBLIC_LOCALURL}`, {
            method: "Post",
            body: JSON.stringify({
                shippingAddress: shippingData
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