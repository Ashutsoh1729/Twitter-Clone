'use client'


import Modal from "./modal"
import { useState } from "react";
import useAuthModal from "@/hook/use-auth-modal";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
}
    from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast";
import axios from "axios";
import { BsGithub, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "./auth-social-button";



type VARIANT = "LOGIN" | "REGISTER";

const loginformSchema = z.object({
    email: z.string().min(2).email(),
    password: z.string().min(5).max(18)
})
const registerformSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email().min(5),
    password: z.string().min(5).max(18)
})

const AuthModal = () => {

    // ALL CONST DECLARATION
    const [variant, setVariant] = useState<VARIANT>("LOGIN")
    const [loading, setLoading] = useState(false)

    const auth = useAuthModal();
    const router = useRouter()

    // 1. Define your form.
    const loginform = useForm<z.infer<typeof loginformSchema>>({
        resolver: zodResolver(loginformSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const registerform = useForm<z.infer<typeof registerformSchema>>({
        resolver: zodResolver(registerformSchema),
        defaultValues: {
            username: "",
            password: "",
            email: ""
        },
    })


    // ALL THE FUNCTIONS

    const handleClose = () => {
        auth.onClose();
    }

    const onSubmit = (data: z.infer<typeof registerformSchema> | z.infer<typeof loginformSchema>) => {
        try {

            // If login
            if (variant == "LOGIN") {
                signIn("credentials", {
                    ...data,
                    redirect: false
                })
                    .then((callback) => {
                        if (callback?.error) {
                            toast.error("Invalid Credentials.")
                        } else if (callback?.ok && !callback?.error) {
                            toast.success("Login Successful.")
                            console.log(callback);

                        }
                    })

            }

            // If register
            if (variant == "REGISTER") {
                axios.post("/api/register", data)
                    .then(() => {
                        signIn("credentials", {
                            ...data,
                            redirect: false
                        })
                            .then((callback) => {
                                if (callback?.error) {
                                    toast.error("Invalid Credentials.")
                                } else if (callback?.ok && !callback?.error) {
                                    toast.success("Registration Successful.")
                                }
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    }).finally(() => {

                    })
            }


        } catch (error) {
            console.log(error);
        } finally {
            auth.onClose();
            loginform.reset();
            registerform.reset();
        }

    }

    const SocialAction = (action: string) => {
        setLoading(true);
        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid Credentials.")
                } else if (callback?.ok && !callback?.error) {
                    toast.success("Login Successful.")
                }
            })
            .finally(() => setLoading(false));

    }


    // ALL THE COMPONENTS   

    // THE TITLE
    const title = (
        <>
            <div className=" flex items-center justify-center w-full pr-6">
                <div className=" text-xl font-semibold">
                    {variant == "LOGIN" ? "Login" : "Register"}
                </div>
            </div>
        </>
    )

    // THE BODY

    const body = (
        <>
            <div className=" h-full w-full px-4 flex flex-col">
                {variant == "LOGIN" ?
                    <div className="flex items-center justify-center w-full flex-col">
                        {/* Here will be the body of login */}
                        <Form {...loginform}>
                            <form autoComplete="off" onSubmit={loginform.handleSubmit(onSubmit)} className=" w-[80%] space-y-6">
                                <FormField
                                    control={loginform.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={loginform.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" type="password" {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                                                This is your public display name.
                                            </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-end">
                                    <Button type="submit" className="px-10 text-md">Submit</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                    :
                    <div className="flex items-center justify-center flex-col">
                        {/* Here will be the body of regiseter */}
                        <Form {...registerform}>
                            <form autoComplete="off" onSubmit={registerform.handleSubmit(onSubmit)} className="w-[80%] space-y-6">
                                <FormField
                                    control={registerform.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={registerform.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={registerform.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-end">
                                    <Button type="submit" className="px-10 text-md">Submit</Button>
                                </div>
                            </form>
                        </Form>

                    </div>

                }

                <div className="mt-4">
                    <div className=" relative ">
                        <div
                            className=" 
                                absolute 
                                flex 
                                items-center 
                                inset-0
                        ">
                            <div
                                className=" 
                                w-full 
                                border-t 
                                border-gray-300 
                            "
                            />
                        </div>

                        <div
                            className="
                            relative flex justify-center text-sm
                        ">
                            <span className=" bg-white px-3 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                </div>
                <div className=" my-4 flex gap-2">
                    <AuthSocialButton
                        icon={BsGithub}
                        onClick={() => SocialAction("github")}
                    />
                    <AuthSocialButton
                        icon={BsGoogle}
                        onClick={() => SocialAction("google")}
                    />
                </div>
            </div>
        </>
    )




    // THE FOOTER
    const footer = (
        <>
            <div className=" flex items-center justify-center w-full py-3">

                {variant == "LOGIN" ?
                    <div className="flex items-center justify-center">
                        <span> Don't have an account?</span>
                        <span className="ml-3 font-medium text cursor-pointer" onClick={() => { setVariant("REGISTER") }}>Register</span>
                    </div>
                    :
                    <div className="flex items-center justify-center">
                        <span> Already have an account?</span>
                        <span className="ml-3 font-medium text cursor-pointer" onClick={() => { setVariant("LOGIN") }}>Login</span>
                    </div>

                }
            </div>
        </>
    )


    return (
        <>
            <Modal
                title={title}
                onClose={handleClose}
                isOpen={auth.isOpen}
                body={body}
                footer={footer}
            />
        </>
    )
}

export default AuthModal



