import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req:Request) {
    try {
        
        const body = await req.json();
        const {
            username,
            email,
            password
        } = body;


        if (!email || !password || !username) {
            return new NextResponse("Internal Error",{status:500})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const user = await prismadb.user.create({
            data: {
                username: username,
                email: email,
                hashedPassword: hashedPassword,
                name: username
            }
        })

        return NextResponse.json(user);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error",{status:500})
        
    }
}