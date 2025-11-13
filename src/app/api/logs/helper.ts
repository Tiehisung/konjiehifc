import { getSessionUser } from "@/app/admin/page";
import { ConnectMongoDb } from "@/lib/dbconfig";
import LogModel from "@/models/logs";
import { ILog } from "@/types";

ConnectMongoDb();
export async function logAction({
    title,
    description,
    category = "api",
    severity = "info", user,
    meta = {},
}: Omit<ILog, "_id" | "createdAt">) {
    try {
        const _user = await getSessionUser();
        const log = await LogModel.create({
            title,
            description,
            user: _user ?? user,
            category,
            severity,
            meta,
            createdAt: new Date(),
        });
        return log;
    } catch (error) {
        console.error("Failed to commit log:", error);
        return null;
    }
}
