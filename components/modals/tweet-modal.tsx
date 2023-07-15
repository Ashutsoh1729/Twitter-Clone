'use client'
import useTweetModal from '@/hook/use-tweet-modal'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import Modal from './modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const loginformSchema = z.object({
    body: z.string().max(270)
})



const TweetModal = () => {

    //  ALL THE CONST 
    const tweet = useTweetModal();
    const route = useRouter();

    const form = useForm<z.infer<typeof loginformSchema>>({
        resolver: zodResolver(loginformSchema),
        defaultValues: {
           body: ""
        },
    })
    // ALL THE FUNCTIONS
    const handleClose = () => {
        tweet.onClose();
    }

    const onSubmit = (data: z.infer<typeof loginformSchema> ) => {
        try {
            console.log(data.body);
            axios.post("/api/post", data)
                .then((res) => {
                    toast.success("Posted")
                    console.log(res);
                    route.refresh();
                    
                }).catch((error) => { 
                    console.log(error);
                    toast.error("Something went wrong. Please try again")
                })
            
        } catch (error) {
            
        } finally {
            tweet.onClose();
            form.reset();
        }
    }

    // ALL THE COMPONENTS

    const title = (
        <>
            <div className=' w-full h-full flex justify-end items-center'>
                <div className=' my-1 mt-2 pr-6 text-sm text-sky-400 font-medium'>
                    Draft
                </div>
            </div>
        </>
    )
    
    const body = (
        <>
            <div className=' w-full h-auto flex flex-col'>
                <div className='flex w-full h-auto'>
                    <div id='profile-img'>
                        {/* Here when the profile image will be derived will be shown */}
                    </div>
                    <div className=' flex flex-col w-full h-auto items-end'>
                        <Form {...form}>
                            <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)} className=" w-[100%] space-y-6">
                                <FormField
                                    control={form.control}
                                    name="body"
                                    render={({ field }) => (
                                        <FormItem>
                                            {/* <FormLabel>Email</FormLabel> */}
                                            <FormControl>
                                                {/* <Input placeholder="What is Happening?" {...field} /> */}
                                                <textarea
                                                    className="p-2 pl-6 w-[80%] ml-auto resize-none h-auto text-lg pr-6 pb-4  outline-none"
                                                    {...field}
                                                    placeholder="What is Happening?"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className=' flex w-full pt-2 items-center border-t '>
                                    <Button type='submit' className=' ml-auto mr-5 rounded-3xl px-6 bg-sky-500 hover:bg-sky-600'>
                                        Tweet
                                    </Button>
                                </div>
                            </form>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    )


    return (
        <>
            <Modal
                onClose={handleClose}
                isOpen={tweet.isOpen}  
                isTop
                title={title}
                body={body}
            />
        </>
    )
}

export default TweetModal