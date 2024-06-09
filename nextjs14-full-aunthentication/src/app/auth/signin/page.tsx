import Link from "next/link"
import SignInForm from "@/components/SignInForm"

interface Props {
    searchParams: {
        callbackUrl: string,
    };
}

const  SigninPage = ({ searchParams }:Props) => {
    console.log({ searchParams });
    return (
        <div className="flex items-center justify-center flex-col">
            <SignInForm callbackUrl={searchParams.callbackUrl} />
            <Link href={"/auth/forgotPassword"}>Forgot Your Password?</Link>
        </div>
    )
}
export default SigninPage