'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {

    const cookiesData = await cookies()
    const DecodeToken = cookiesData.get("__Secure-next-auth.session-token")?.value

    const data= await decode({ token: DecodeToken, secret: process.env.NEXTAUTH_SECRET! })

    return data?.token

}