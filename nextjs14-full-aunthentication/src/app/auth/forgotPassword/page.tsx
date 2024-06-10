"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"
import { Input, Button } from "@nextui-org/react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";


const FormSchema = z.object({
    email: z.string().email("Please enter a valid email"),
});

type InputType = z.infer<typeof FormSchema>

const ForgotPasswordPage = () => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });


    const submitRequest:SubmitHandler<InputType> = async (data) => {
        console.log({data})
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
            <form className="flex flex-col gap-2 p-2 border m-2 rounded-md shadow" onSubmit={handleSubmit(submitRequest)}>

                <div className="text-center p-2">Enter Your Email</div>
                <Input label="Email" {...register("email")} startContent={<EnvelopeIcon className="w-4 place-self-start" />} errorMessage={errors.email?.message} />

                <Button
                    isLoading={isSubmitting}
                    type="submit"
                    disabled={isSubmitting}
                    color="primary" >
                    {isSubmitting ? "Please Wait..." : "Submit"}
                </Button>
            </form>
            <Image
                alt="Fprgot Password"
                src={"/forgotPass.png"}
                width={500} height={500}
                className="col-span-2" />
        </div>
    )
}

export default ForgotPasswordPage