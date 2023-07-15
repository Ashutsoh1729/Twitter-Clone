import getCurrentUser from "@/action/get-current-user";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        const {body} = await req.json();
        const user = await getCurrentUser();
        
        if(!user?.email) return new NextResponse("Authentication failed.",{status: 401})

        const post = await prismadb.post.create({
            data: {
                content: body,
                authorId: user?.id,
            }
        })

        return NextResponse.json(post);





    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error",{status:500})
        
    }    
}