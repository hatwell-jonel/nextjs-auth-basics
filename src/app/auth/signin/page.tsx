"use client";

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import LoadingButton from '@/components/loading-btn'
import { handleCredentialsSignIn } from '@/app/actions/authActions';
import { SignInSchema } from '@/lib/zod';

const SignIn = () => {
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    
    const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
        try {
            console.log(values);
            const result = await handleCredentialsSignIn(values);
            return result;
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <main className="flex  items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-3xl font-bold text-center text-gray-800">
                    <CardTitle>Welcome Back</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                placeholder='Enter your email address'
                                                autoComplete='off'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='Enter your password'
                                                autoComplete='off'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <LoadingButton pending={form.formState.isSubmitting} />
                        </form>
                    </Form>
                </CardContent>
            </Card> 
        </main>
    )
}

export default SignIn