import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


interface IParams {
    userId?: string,
}


export async function GET(req: Request, { params }: { params: IParams }) {
    try {
        const id = params.userId;

        const user = await prismadb.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return NextResponse.json("User not found.")
        }

        return NextResponse.json(user);

        
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error",{status:500})
        
    }
    
}

















