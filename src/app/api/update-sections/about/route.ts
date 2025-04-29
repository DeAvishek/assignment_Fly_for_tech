import dbConnect from "@/app/lib/db";
import SectionModel from "@/app/model/section";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function PUT(req:NextRequest){
    try {
        await dbConnect()
        const reqBody  = await req.json();
        await SectionModel.findOneAndUpdate({sectionName:"About Section"},{content:reqBody.content})
        return NextResponse.json({message:"Hero section updated successFully"},{status:200})
    } catch (error) {
        return NextResponse.json({message:error||"InterNal server error"},{status:500})
    }
}