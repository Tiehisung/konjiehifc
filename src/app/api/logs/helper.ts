import { ConnectMongoDb } from "@/lib/dbconfig";
import LogModel from "@/models/logs";
import { ILog } from "@/types";

ConnectMongoDb();
export async function logAction({
    title,
    description,
    user,
    category = "api",
    severity = "info",
    meta = {},
}: Omit<ILog, "_id" | "createdAt">) {
    try {
        const log = await LogModel.create({
            title,
            description,
            user,
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
