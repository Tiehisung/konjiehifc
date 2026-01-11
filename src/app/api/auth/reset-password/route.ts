import { ConnectMongoDb } from "@/lib/dbconfig";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { logAction } from "../../logs/helper";
import bcrypt from "bcryptjs";
import { IUser } from "@/types/user";

ConnectMongoDb();

//Reset Password
export async function PUT(req: NextRequest,) {
    try {
        const { email, password, name, } = await req.json() as IUser

        if (!email || !password) return NextResponse.json({ success: false, message: 'Missing email, name or password' });

        let foundUser = await UserModel.findOne({ email })
        if (!foundUser) return NextResponse.json({ success: false, message: 'User not found' });

        const dbNames = foundUser.name.toLowerCase().trim().split(' ') as string[]
        const formattedNewnames = name?.toLowerCase()?.trim()?.split(' ')

        //Each name must be in store name
        const allPassed = formattedNewnames.every(nn => dbNames.find(dn => dn == nn));

        if (!allPassed) return NextResponse.json({ success: false, message: 'Invalid names' });

        //Store password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        foundUser.password = hashedPassword;
        await foundUser.save();

        const safeUser = {
            name: foundUser.name,
            image: foundUser.image,
            role: foundUser.role,
            email,
            id: foundUser._id,
        };

        // Log
        logAction({
            title: ` Password Reset - ${name}.`,
            description: `User with email ${email} reset their password.`,
        })

        return NextResponse.json({
            message: "User updated",
            success: true,
            data: safeUser,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to update user",
        });
    }
}
