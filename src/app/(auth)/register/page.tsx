'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
export default function Register() {
  const Router = useRouter()
  const Scheme = z.object({

    name: z.string().nonempty("Required").min(2, "min char 2").max(12, "max char 12"),
    email: z.email("enter valid Email").nonempty("Email Required"),
    password: z.string().nonempty("Password Required").regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^0-9A-Za-z])(?=.{6,}).*$/, "enter Valid Password"),
    rePassword: z.string().nonempty("rePassword Required"),
    phone: z.string().nonempty("Phone Required").regex(/^(2|\+20)?01[0152][0-9]{8}$/, "Enter valid Phone")
  }).refine((obj) => {
    return obj.password == obj.rePassword
  }, {
    path: ["rePassword"],
    error: "RePassword not Match Password"
  })
  const registerForm = useForm<z.infer<typeof Scheme>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(Scheme)
  })


  async function handleRegister(values: z.infer<typeof Scheme>) {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        }
      })

      const data = await res.json()

      if (data.message == 'success') {
        toast.success("Account Create", { position: "top-center", duration: 3000 })
        Router.push('/login')
      }


    } catch (err) {
      console.log(err);

      toast.error("errrrrrrrrrrror")
    }
  }
  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-3xl my-5'>Register Now</h1>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(handleRegister)} className='space-y-6'>


          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Name :</FormLabel>
                <FormControl>
                  <Input type='text'  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
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
            control={registerForm.control}
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
          <FormField
            control={registerForm.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel >rePassword :</FormLabel>
                <FormControl>
                  <Input type='password'  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel >phone :</FormLabel>
                <FormControl>
                  <Input type='tel'  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <Button className='w-full bg-main rounded-3xl'>Register</Button>
        </form>
      </Form>

    </div>
  )
}
