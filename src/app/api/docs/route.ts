import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, removeEmptyKeys } from "@/lib";
import DocModel from "@/models/doc";
import { IPostDoc } from "@/app/admin/docs/page";
import { IDeleteFile, TSearchKey } from "@/types";
import { logAction } from "../logs/helper";
import { IUser } from "@/types/user";
import { deleteCldAssets } from "../file/route";

ConnectMongoDb();

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1", 10);
    const limit = Number.parseInt(searchParams.get("limit") || "20", 10);

    const search = searchParams.get("doc_search") as TSearchKey || "";

    const skip = (page - 1) * limit;

    const regex = new RegExp(search, "i");
    const query = {
        $or: [
            { "name": regex },
            { "original_filename": regex },
            { "folder": regex },
            { "description": regex },
        ],
    };

    const cleaned = removeEmptyKeys(query);

    const logs = await DocModel.find(cleaned)
        .sort({ createdAt: 'desc' })
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await DocModel.countDocuments(cleaned);
    return NextResponse.json({
        success: true,
        data: logs, pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        const { file, folder, format, tags, user } = await req.json() as IPostDoc & { user: IUser }

        const doc = await DocModel.create({
            ...file,
            tags,
            folder,
            format,
        });

        // log
        await logAction({
            title: `File uploaded to - ${folder}`,
            description: `${file.name ?? file.original_filename} uploaded on ${Date.now()}` as string,
            category: "db",
            severity: "info",
            user: user as IUser,
        });
        return NextResponse.json({
            success: true,
            message: "New Document Uploaded",
            data: doc,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: getErrorMessage(error, "Failed to create document"),
        });
    }
}

//Delete from Cloud then pull id from collection files field
export async function DELETE(req: NextRequest) {
    try {
        const { files, user } = await req.json() as { user: IUser, files: IDeleteFile[] };
        //Delete file from cloudinary
        await deleteCldAssets(files)

        //Delete file data from database
        const deleteFromDb = await DocModel.deleteMany({
            _id: {
                $in: files.map(f => f._id).filter(Boolean) ?? [],
            }
        });
        // log
        await logAction({
            title: "Document deleted",
            description: `${files.length} documents deleted [${files.map(f => f.public_id).toString()}]`,
            category: "db",
            severity: "critical",
            user
        });
        return NextResponse.json({
            message: "Delete  successful ",
            success: true,
            data: deleteFromDb,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to delete file.",
            success: false,
            data: error,
        });
    }
}