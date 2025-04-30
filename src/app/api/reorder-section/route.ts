import dbConnect from "@/app/lib/db";
import SectionModel from "@/app/model/section";
import { NextRequest , NextResponse} from "next/server";

export async function PUT(req:NextRequest){
    try {
        await dbConnect()
        const reqBody = await req.json()
        const {sectionOrder} = reqBody

        for (let i = 0; i < sectionOrder.length; i++) {
            await SectionModel.findOneAndUpdate(
              { sectionName: sectionOrder[i] },
              { order: i }
            );
          }
        return NextResponse.json({ message: "Section order updated successfully" }, { status: 200 })
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })

    }
}