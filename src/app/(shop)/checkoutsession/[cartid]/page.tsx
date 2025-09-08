'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Textarea } from "@/components/ui/textarea"
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import { checkoutPaymentSession } from 'src/app/OrderAction'
import { useParams } from 'next/navigation'
export default function CheckOutSession() {
    const { cartid }: { cartid: string } = useParams()

    const CheckOutForm = useForm({
        defaultValues: {
            details: "",
            phone: "",
            city: ""
        }
    })
    async function handleCheckOut(values: { details: string, phone: string, city: string }) {
        const data = await checkoutPaymentSession(cartid, values)
        console.log(data.session.url);
        window.open(data.session.url)

    }
    return (
        <div className='w-3/4 mx-auto'>


            <Form {...CheckOutForm}>
                <form className='space-y-1.5' onSubmit={CheckOutForm.handleSubmit(handleCheckOut)}>


                    <FormField
                        control={CheckOutForm.control}
                        name="details"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Details</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={CheckOutForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >City</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={CheckOutForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >phone</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button className=''>Credit Payment</Button>
                </form>
            </Form>
        </div>
    )
}
