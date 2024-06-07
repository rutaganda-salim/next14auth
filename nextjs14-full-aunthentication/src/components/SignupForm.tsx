"use client";
import { Checkbox, Input, Link, Button } from "@nextui-org/react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { z } from "zod";
import validator, { isMobilePhone } from "validator";
const FormSchema = z.object(
    {
        firtsName: z.string()
            .min(2, "First Name must be atleast 2 characters")
            .max(45, "First Name must be less than 45 characters").regex(new RegExp("^[a-za-Z]+$", "No Special Character allowed!")),


        lastName: z.string()
            .min(2, "Last Name must be atleast 2 characters")
            .max(45, "Last Name must be less than 45 characters").regex(new RegExp("^[a-za-Z]+$", "No Special Character allowed!")),

        email: z
        .string()
        .email("Please enter a valid email address"),

        phone: z
        .string()
        .refine(validator.isMobilePhone, "PLease Enter a valid phone number"),

        password: z
        .string()
        .min(6, "Password must be atleast 6 chracters")
        .max(50, "Password must be less than 50 characters"),

        ConfirmPassword: z
        .string()
        .min(6, "Password must be at least 6 character")
        .max(50, "Password must be less than 50 characters"),
        acceptes:z.literal(true, {
            errorMap: ()=>(
                {
                    message: "Please accept all terms"
                }
            )
        })
    }
).refine(data=>data.password === data.ConfirmPassword, {
    message: "Password and Confirm password doesn't match",
    path: ["Password", "ConfirmPassword"],
}

)

const SignupForm = () => {
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const toggleVisiblePass = () => setIsVisiblePass((prev) => !prev);

    return (
        <form className="grid grid-cols-2 gap-3 p-2 place-self-stretch shadow border rounded-md">
            <Input label="First Name" startContent={<UserIcon className="w-4" />} />
            <Input label="Last Name" startContent={<UserIcon className="w-4" />} />
            <Input className="col-span-2" label="Email" startContent={<EnvelopeIcon className="w-4" />} />
            <Input className="col-span-2" label="Phone" startContent={<PhoneIcon className="w-4" />} />
            <Input
                className="col-span-2"
                label="Password"
                type={isVisiblePass ? "text" : "password"}
                startContent={<KeyIcon className="w-4" />}
                endContent={
                    isVisiblePass ? (<EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />) : (
                        <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />
                    )
                }
            />
            <Input
                className="col-span-2"
                label="Confirm Password"
                type={isVisiblePass ? "text" : "password"}
                startContent={<KeyIcon className="w-4" />}
            />
            <Checkbox className="col-span-2">
                I Accept The <Link href="/terms">Terms</Link>
            </Checkbox>

            <div className="flex justify-center col-span-2">
                <Button type="submit" color="primary" className="w-48">Submit</Button>
            </div>

        </form>
    );
};

export default SignupForm;
