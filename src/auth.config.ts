import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

import { SignInSchema } from "./lib/zod"
 
export default { 
    providers: [
    Credentials({
            async authorize(credentials) {
                const validatedFields = SignInSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    if(email != "" && password != "") {
                        return {
                            id: 1,
                            name: "Jonel",
                            email: "jonel@gmail.com",
                            role: "admin",
                        };
                    }
                }
                
                return null;
            }
        })
    ],
    callbacks: {
        signIn: async ({ user }) => {

            // condition only user with verified email can logged/
            // const existingUser  = {
            //     id: 1,
            //     name: "Jonel",
            //     email: "jonel@gmail.com",
            //     role: "admin",
            //     isEmailVerified: true,
            // };

            // if(!existingUser.isEmailVerified) {
            //     return false;
            // }
            console.log(user);
            return true;
        },
        jwt: async ({ token }) => {
            const existingUser  = {
                id: 1,
                name: "Jonel",
                email: "jonel@gmail.com",
                role: "admin",
            };
            token.role = existingUser.role;
            return token;
        },
        session : async ({ session, token }) => {
            console.log("session", token);
            if(session.user && token.sub) {
                session.user.id = token.sub;
            }
            if(session.user && token.role) {
                session.user.role = token.role as "admin" | "user";
            }

            console.log()
            return session;
        },
        
    }

} satisfies NextAuthConfig