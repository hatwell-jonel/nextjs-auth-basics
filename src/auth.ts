import NextAuth,  { type DefaultSession }  from "next-auth"
import authConfig from "./auth.config"

// YOUTUBE TUTS
// https://www.youtube.com/watch?v=1MTyCvS05V4&t=12503s

declare module "next-auth" {
    interface Session {
        user: {
            role: string
        } & DefaultSession["user"]
    }
}

export const { 
    handlers, 
    signIn, 
    signOut, 
    auth 
} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    ...authConfig,
})