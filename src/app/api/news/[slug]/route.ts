import { getErrorMessage, isObjectId } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import ArchivesModel from "@/models/archive";
import NewsModel from "@/models/news";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { FilterQuery } from "mongoose";


ConnectMongoDb();
export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {

    const slug = (await params).slug;

    const query = { $or: [{ slug }, { _id: slug }] }

    const news = await NewsModel.findOne(query);
    return NextResponse.json(news);
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const slug = (await params).slug;
        const query = { $or: [{ slug }, { _id: slug }] } as FilterQuery<string>

        //First retrieve item
        const foundNewsItem = await NewsModel.findOne(query);
        //Then archive
        await ArchivesModel.updateOne(
            { category: "deleted_news" },
            { $push: { data: { ...foundNewsItem, isLatest: false } } }
        );
        //Then delete from main collection
        const deleted = await NewsModel.deleteOne(query);
        if (deleted.acknowledged)
            return NextResponse.json({
                message: "News deleted",
                success: true,
            });
    } catch (error) {
        return NextResponse.json({
            message: getErrorMessage(error, "Failed to delete! "),
            success: false,
        });
    }
}

// Edit
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const slug = (await params).slug;
        const query = { $or: [{ slug }, { _id: slug }] } as FilterQuery<string>

        const body = await request.json();

        //update field
        const updated = await NewsModel.updateOne(
            query,
            { $set: { ...body } }
        );
        if (updated.acknowledged)
            return NextResponse.json({
                message: "News updated",
                success: true,
            });
    } catch (error) {
        return NextResponse.json({
            message: getErrorMessage(error, "Failed to update! "),
            success: false,
        });
    }
}
