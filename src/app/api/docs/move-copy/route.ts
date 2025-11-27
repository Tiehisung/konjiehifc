import { NextRequest, NextResponse } from "next/server";
import { logAction } from "../../logs/helper";
import DocModel from "@/models/doc";
import { IUser } from "@/types/user";
import { getErrorMessage } from "@/lib";
import { IFileProps } from "@/types";
import { DocumentFolder } from "@/app/admin/docs/page";

export interface IDocMoveCopy {
    file: IFileProps,
    actionType: 'Move' | 'Copy',
    destinationFolder: DocumentFolder
    user?: IUser,
}
export async function PUT(req: NextRequest) {
    try {
        const { file, user, actionType, destinationFolder } = await req.json() as IDocMoveCopy

        if (actionType == 'Move') {
            await DocModel.findByIdAndUpdate(file?._id, {
                $set: { folder: destinationFolder }
            });

        } else {
            const { _id, ...docWithoutId } = file
            await DocModel.create({
                ...docWithoutId, folder: destinationFolder
            });
        }

        // log
        await logAction({
            title: `${actionType} to ${destinationFolder} successful`,
            description: `${file.name ?? file.original_filename} '${actionType}' on ${Date.now()}` as string,
            category: "db",
            severity: "info",
            user: user as IUser,
        });
        return NextResponse.json({
            success: true,
            message: `${actionType} successful`,

        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: getErrorMessage(error, `Failed `),
        });
    }
}
