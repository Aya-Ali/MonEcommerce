import { ProductData } from "src/types/Product.type"
export async function GetAllProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
    const apiData: ProductData = await res.json()
    if (!res.ok) {
        return apiData
    }
    return apiData
}

export async function GetProductDetails(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
    const data = await res.json()
    if (!res.ok) {
        return { error: res.statusText }
    }
    return data
}