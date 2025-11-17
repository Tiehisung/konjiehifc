import { getErrorMessage, removeEmptyKeys } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { logAction } from "../logs/helper";
import { IUser } from "@/types/user";
import FeatureModel from "@/models/feature";
import { FilterQuery } from "mongoose";


ConnectMongoDb();
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1", 10);

    const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const search = searchParams.get("search") || "";
    const featureName = searchParams.get("name") || "";

    const regex = new RegExp(search, "i");

    const query = { } as FilterQuery<unknown>

    if (search) query.$or = [{ "name": regex },]

    if (featureName) query.name = featureName

    const cleaned = removeEmptyKeys(query)

    const features = await FeatureModel.find(cleaned)
        .limit(limit).skip(skip)
        .lean().sort({ createdAt: "desc" });

    const total = await FeatureModel.countDocuments(cleaned)

    return NextResponse.json({
        success: true, data: features, pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    });
}

export async function POST(request: NextRequest) {
    try {
        const { name, data, user } = await request.json();

        const exists = await FeatureModel.findOne({ name: new RegExp(name, 'i') })

        if (exists)
            return NextResponse.json({ message: "Feature already exists.", success: false });

        const savedFeature = await FeatureModel.create({
            name, data
        });

        // log
        await logAction({
            title: "Feature Created",
            description: `New data feature created by ${user?.name ?? 'Admin'}`,
            category: "db",
            severity: "info",
            user: user as IUser,

        });
        return NextResponse.json({ message: "Feature created successfully!", success: true, data: savedFeature });

    } catch (error) {
        return NextResponse.json({
            message: getErrorMessage(error),
            success: false,
        });
    }
}

export async function PUT(request: NextRequest,) {
    const { user, _id, data } = await request.json()

    const updated = await FeatureModel.findByIdAndUpdate(_id, { $set: { data } })

    await logAction({
        title: "Feature Updated",
        description: `Feature updated by ${user?.name ?? 'Admin'}`,
        category: "db",
        severity: "info",
        user: user as IUser,
    });
    return NextResponse.json({
        success: true,
        data: updated,
        message: 'Feature Updated'
    });
}

export async function DELETE(request: NextRequest) {

    const { user, _id: featureId } = await request.json()

    console.log({ featureId })
    const updated = await FeatureModel.findByIdAndDelete(featureId)

    await logAction({
        title: "Feature deleted",
        description: `Feature deleted by ${user?.name ?? 'Admin'}`,
        category: "db",
        severity: "info",
        user: user as IUser,
    });
    return NextResponse.json({
        success: true,
        data: updated,
        message: 'Feature Deleted'
    });
}