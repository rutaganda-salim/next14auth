"use client"
import { useSession } from "next-auth/react"
import Link from "next/link";


const SigninButton = () => {
    const { data: session } = useSession();
    return (
        <div>
            {session && session.user ?
                <>
                    <p>{session.user.email}</p>
                    <Link href={"/api/auth/signout"}>Sign Out</Link>
                </>: <Link href={"api/auth/signin"}></Link>
            }
        </div>
    )
}

export default SigninButton