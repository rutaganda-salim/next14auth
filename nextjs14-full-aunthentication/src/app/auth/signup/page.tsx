import SignupForm from "@/components/SignupForm";
import {Link, Image} from "@nextui-org/react";

export default function SignupPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3">
            <div className="md:col-span-2 flex justify-center items-center">
                <p className="text-center p-2">Already Signed up?</p>
                <Link href={"/auth/signin"}>Sign In</Link>
            </div>
            <SignupForm />
            <Image src="/login.png" alt="login Form" width={500} height={500} />
        </div>
    );
};
