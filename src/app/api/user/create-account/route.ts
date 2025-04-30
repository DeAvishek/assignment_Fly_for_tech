import { NextResponse,NextRequest} from "next/server";
import dbConnect from "@/app/lib/db";
import UserModel from "@/app/model/user";
export async function POST(req: NextRequest) {
    const { username, email } = await req.json()

    
    try {
        await dbConnect()
        const existUser = await UserModel.findOne({ email: email })
        if (existUser) {
            return NextResponse.json({
                messgae: "User with email exists",
                success: false
            }, {
                status: 400  
            })
        }
        const newUser = new UserModel({
            username: username,
            email: email,
        })

        await newUser.save()
        return NextResponse.json({
            message: "User created successfully",
            success: true,
        },{
            status:201
        })
    } catch (error: unknown) {
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Sign up error",
            success: false
        }, {
            status: 500
        })
    }
} 
