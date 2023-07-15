import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


interface IParams {
    postId: string,
}



export async function DELETE(req:Request,{params}: {params:IParams}) {
    try {
        const id = params.postId;

        const res = await prismadb.post.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json(res,{status:200})
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error",{status:500})
        
    }
    

}



































