import Link from "next/link";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/app/actions/authActions";
import { auth } from "@/auth";

export default async function Navbar() {
    const session = await auth();
    return (    
        <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
            <Link href="/" className="text-xl text-black font-bold">
                Auth.js
            </Link>
            {/* {!session ? (
                <Link href="/auth/signin">
                <Button variant="default">Sign In</Button>
                </Link>
            ) : ( */}

            {
                session && (
                    <form action={async () => {
                        'use server'
                        await handleSignOut();  
                    }
                }>
                    <Button variant="default" type="submit">
                        Sign Out
                    </Button>
                </form>
                )
            }
            {/* )} */}
        </nav>
    );
}