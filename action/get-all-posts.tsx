import { NextResponse } from "next/server";
import getCurrentUser from "./get-current-user"
import prismadb from "@/lib/prismadb";

const getAllPosts = async() => { 
    try {
        const posts = await prismadb.post.findMany({
        })

        return posts
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error",{status: 500})
    }



}


export default getAllPosts




















