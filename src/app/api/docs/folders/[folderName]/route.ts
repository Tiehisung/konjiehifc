import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib";
import { logAction } from "../../../logs/helper";
import { deleteCldAssets } from "../../../file/route";
import { ELogSeverity } from "@/types/log";
import FolderModel, { IPostFolder } from "@/models/folder";
import { auth } from "@/auth";
import { EUserRole, IUser } from "@/types/user";
import DocModel from "@/models/doc";
import { IFolder } from "@/types/doc";

ConnectMongoDb();

export async function GET(_: NextRequest, { params }: { params: Promise<{ folderName: string }> }) {
    const folderName = (await params).folderName;
    const folder = await FolderModel.findOne({ name: folderName })
        .populate('documents').lean();
    return NextResponse.json(folder);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ folderName: string }> }) {
    try {
        const folderName = (await params).folderName;
        const foundFolder: (IPostFolder & { _id: string }) | null = await FolderModel.findOne({ name: folderName });
        if (!foundFolder) {
            return NextResponse.json({
                success: false,
                message: "Folder not found",
            });
        }

        const { ...data } = await req.json() as IPostFolder
        const { name, description, tags } = data;

        await FolderModel.findOneAndUpdate({ name: folderName }, {
            $set: {
                ...data
            },
        });

        //Rename 'folder' of every containing doc file on database
        if (name && foundFolder.name !== name) {
            await DocModel.updateMany({
                _id: {
                    $in: foundFolder?.documents?.map((doc) => doc?._id?.toString()).filter(Boolean) ?? [],
                },

            },
                { $set: { folder: name } }
            );
        }



        let title = ''
        let desc = ''
        let tagsChangedMsg = ' '

        if (name && foundFolder.name !== name) {
            title += `Name changed from ${foundFolder.name} to ${name}. `

        }
        if (description && foundFolder.description !== description) {
            desc += `Description changed from ${foundFolder.description} to ${description}. `
        }
        if (name && foundFolder.tags !== tags) {
            tagsChangedMsg = `Tags changed from ${foundFolder.tags} to ${tags}. `;
        }

        // log
        await logAction({
            title: title || ` Folder [${name}] updated.`,
            description: desc + tagsChangedMsg,
        });
        return NextResponse.json({
            success: true,
            message: "Folder Updated",

        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: getErrorMessage(error, "Failed to update folder"),
        });
    }
}

//Delete from Cloud then pull id from collection files field
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ folderName: string }> }) {
    try {
        const session = await auth();
        const folderName = (await params).folderName;

        if ((session?.user as IUser)?.role !== EUserRole.SUPER_ADMIN) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
            });
        }

        const deletedFolder: IFolder = await FolderModel.findOne({ name: folderName }).populate('documents');

        //Delete file from cloudinary
        await deleteCldAssets(deletedFolder?.documents
            ?.map((doc) => ({ public_id: doc.public_id })) ?? []);

        //Delete file data from database
        const deleteFromDb = await DocModel.deleteMany({
            _id: {
                $in: deletedFolder?.documents?.map(doc => doc._id).filter(Boolean) ?? [],
            }
        });
        // log
        const logDesc = deletedFolder?.documents?.length ? `${deletedFolder?.documents?.length} docs deleted. [${deletedFolder?.documents?.map(dd => dd.name)?.join(', ')}].` : 'No documents to delete.';
        await logAction({
            title: "Folder deleted",
            description: logDesc,
            severity: ELogSeverity.CRITICAL,
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