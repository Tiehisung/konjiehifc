import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { EUserRole, ISession } from './types/user';
import { ConnectMongoDb } from "./lib/dbconfig";
import UserModel from "./models/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
            async profile(profile) {
                const role = allowedUsers.includes(profile.email)
                    ? EUserRole.ADMIN
                    : EUserRole.GUEST;

                ConnectMongoDb();

                let user = await UserModel.findOne({ email: profile.email });

                if (!user) {
                    user = await UserModel.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture,
                        role,
                    });
                }

                return {
                    id: profile.sub,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role,
                };
            },
        })],


    callbacks: {
        async jwt({ token, user }) {
            // First sign-in
            if (user) {
                token.role = (user as ISession['user']).role ?? EUserRole.GUEST;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                (session.user as ISession['user']).role = token.role as EUserRole;
            }
            return session;
        },
    },
});

export const allowedUsers = [
    'isoskode@gmail.com',
    'soskode.ai@gmail.com',
    'tiehisungai@gmail.com',
    '20021992ai@gmail.com',
    'konjiehifc@gmail.com',

]