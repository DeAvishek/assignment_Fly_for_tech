import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dbConnect from "@/app/lib/db";
import Section from "@/app/model/section";

export async function POST(req:NextRequest){
    const reqBody = await req.json();
    if(!reqBody){
        return NextResponse.json({
            message:"Not sufficient input",
            success:false,
        },{
            status:400
        })
    }
    try {
        await dbConnect()
        const newSection =  await new Section(reqBody);
        await newSection.save();
        return NextResponse.json({message:"Created Successfully",success:true},{status:200})

    } catch (error) {
        console.error("Error creating section:", error);
        return NextResponse.json({message:"Internal server error",success:false},{status:500})
    }
}