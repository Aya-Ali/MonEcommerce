'use client'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { usePathname, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { getCartData } from 'src/app/CartActions'
import { CartData, ProductElement } from 'src/types/CartData.type'
import { CountContext } from 'src/context/CountContext'
export default function Login() {
  const Router = useRouter()
  const countData = useContext(CountContext)
  const Scheme = z.object({


    email: z.email("enter valid Email").nonempty("Email Required"),
    password: z.string().nonempty("Password Required").regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^0-9A-Za-z])(?=.{6,}).*$/, "enter Valid Password"),

  })
  const loginForm = useForm<z.infer<typeof Scheme>>({
    defaultValues: {

      email: "",
      password: "",

    },
    resolver: zodResolver(Scheme)
  })


  async function handlelogin(values: z.infer<typeof Scheme>) {


    const Res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/home'
    })

    if (Res?.ok) {
      toast.success("Login!", { position: "top-center", duration: 3000 })
      const data: CartData | undefined = await getCartData()
      const sum: number | undefined = data?.data.products.reduce((total: number, el: ProductElement) => {
        return total += el.count
      }, 0)

      if (sum) countData?.setNumberCart(sum)
      Router.push('/home')
    }
    else {
      toast.error(Res?.error, { position: "top-center", duration: 3000 })
    }
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
    //   method: "POST",
    //   body: JSON.stringify(values),
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // })
    // if (!res.ok) {
    //   const errorData = await res.json();
    //   console.log(errorData);
    //   toast.error(errorData.message, { position: "top-center", duration: 3000 })

    // }
    // const data = await res.json()

    // toast.success("Login!", { position: "top-center", duration: 3000 })
    // Router.push('/home')




  }
  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-3xl my-5'>Login Now</h1>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(handlelogin)} className='space-y-6'>




          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Email :</FormLabel>
                <FormControl>
                  <Input type='email'  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel >password :</FormLabel>
                <FormControl>
                  <Input type='password'  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <Button className='w-full bg-main rounded-3xl'>Login</Button>
        </form>
      </Form>

    </div>
  )
}
