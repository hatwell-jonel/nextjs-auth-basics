'use server'
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { SignInSchema } from "@/lib/zod";
import { z } from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export async function handleCredentialsSignIn(values : z.infer<typeof SignInSchema>) {
    const validatedFields = SignInSchema.safeParse(values);
    if (!validatedFields.success) {
        return validatedFields;
    }
    const { email, password } = validatedFields.data;

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return error;
        }
        throw error;
    }

};

export async function handleSignOut() {
    await signOut({
        redirectTo: '/auth/signin',
    });
}