import dbConnect from "@/app/lib/db";
import SectionModel from "@/app/model/section";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect()
        const hero = await SectionModel.findOne({sectionName:"hero"})
        return NextResponse.json({section:hero , success:true},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal server error",success:false},{status:500})
    }
}