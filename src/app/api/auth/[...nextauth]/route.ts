import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";

export const NextAuthOPtions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
                    {
                        method: "post",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        }),
                        headers: {
                            'content-type': "application/json"
                        }
                    }
                )
                const data = await res.json()

                if (data.message == 'success') {
                    const Decode: { id: string } = jwtDecode(data.token)
                    return {
                        id: Decode.id,
                        user: data.user,
                        token: data.token
                    }
                }
                else {
                    throw new Error(data.message)
                }
            }
        })
    ],
    callbacks: {
        // NEXTAUTH_SECRET encrepyt => Token Cookies Api Token
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token
        },


        // Share Data Application ssr getSer, csr useSession  context
        async session({ session, token }) {
            session.user = token.user
            return session
        },
    }
}


const handler = NextAuth(NextAuthOPtions)

export { handler as GET, handler as POST }









