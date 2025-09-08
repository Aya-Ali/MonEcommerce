import { getServerSession, User } from 'next-auth'
import React from 'react'
import { NextAuthOPtions } from 'src/app/api/auth/[...nextauth]/route';

export default async function page() {
    const data = await getServerSession(NextAuthOPtions)
    console.log(data?.user);

    return (
        <div>page</div>
    )
}
