import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { EUserRole, ISession, IUser } from './types/user';
import { ConnectMongoDb } from "./lib/dbconfig";
import UserModel from "./models/user";
import { logAction } from "./app/api/logs/helper";
import bcrypt from 'bcryptjs'
import { isValidEmail } from "./lib/validate";
import { getUserById } from "./app/admin/authorization/page";

 ConnectMongoDb();
export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
   
            async profile(profile) {
               
                let user = await UserModel.findOne({ email: profile.email });

                if (!user) {
                    user = await UserModel.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture,
                        lastLoginAccount: 'google',
                        signupMode: 'google',
                    });

                    // Log
                    logAction({
                        title: ` Signup - [${profile?.name}].`,
                        description: `User with email ${profile.email} signed up.`,
                    })
                }
                else {
                    if (user?.image !== profile.picture || user?.name !== profile.name) {
                        // Update user info
                        user.name = profile.name;
                        user.image = profile.picture;
                        user.lastLoginAccount = 'google';
                        await user.save();
                    }
                    // Log
                    logAction({
                        title: ` Login - [${profile?.name}].`,
                        description: `User with email ${profile.email} logged in.`,
                    })
                }

                return {
                    id: user._id?.toString(),
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: user?.role,
                };
            },
            authorization: {
                params: {
                    prompt: "select_account",   // 👈 always show account picker
                },
            }
        }), //Credentials
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials, request) {
                const { username, password } = credentials as { username: string; password: string }
                // const email = isValidEmail(username) ? username : username.concat('@kfc.com')
                // console.log({ credentials ,})
                // return { email, role: 'player', name: String(password) }
                try {
                    
                    const foundUser = (await UserModel.findOne({
                        email: credentials?.username,
                    })
                        .lean()
                        .exec()) as IUser | null;
                    console.log("Found user:", foundUser);

                    if (foundUser) {
                        const matched = await bcrypt.compare(
                            credentials?.password as string,
                            foundUser.password as string
                        ); //Compare passwords

                        if (matched) {
                            const { _id, name, image, role, email } = foundUser; //Eliminate pass
                            const safeUser = {
                                name,
                                image,
                                role,//Assign role
                                email,
                                id: _id,
                            };

                            //Normal user
                            return { ...safeUser };
                        } else {

                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.log('Credentials error:', error);
                    return null
                }

            },
        }),
    ],


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
    pages: {
        error: "/auth/error",
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
    }
});

