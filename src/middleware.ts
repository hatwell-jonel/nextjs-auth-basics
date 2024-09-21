import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
} from "./routes"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // console.log("========================================================");
    // console.log("pathname: ", nextUrl.pathname)
    // console.log("isLoggedIn: ", isLoggedIn)
    // console.log("isApiAuthRoute", isApiAuthRoute);
    // console.log("isAuthRoute", isAuthRoute);
    // console.log("isPublicRoutes", isPublicRoutes);
    // console.log("========================================================");

    if(isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if(isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if(!isLoggedIn && !isPublicRoutes) {
        return Response.redirect(new URL('/auth/signin', nextUrl));
    }
    
    return null;
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}