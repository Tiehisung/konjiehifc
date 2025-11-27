import { ConnectMongoDb } from "@/lib/dbconfig";
import DocModel from "@/models/doc";
ConnectMongoDb();
export async function getDocumentMetrics() {
    const [folders, totalDocs] = await Promise.all([
        DocModel.aggregate([
            {
                $group: {
                    _id: "$folder",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    folder: "$_id",
                    count: 1
                }
            }
        ]),
        DocModel.countDocuments()
    ]);

    return {
        totalDocs,
        folders
    };
}
