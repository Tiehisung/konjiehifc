import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { EUserRole, ISession } from './types/user';
import { ConnectMongoDb } from "./lib/dbconfig";
import UserModel from "./models/user";
import { logAction } from "./app/api/logs/helper";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         response_type: "code",
            //     },
            // },
            async profile(profile) {
                ConnectMongoDb();
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
                    role: user?.role
                };
            },
            authorization: {
                params: {
                    prompt: "select_account",   // 👈 always show account picker
                },
            }
        }), //Credentials
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: {
        //             label: "Email",
        //             type: "email",
        //             placeholder: "Enter valid email",
        //         },
        //         password: {
        //             label: "Password",
        //             type: "password",
        //             placeholder: "Enter your password",
        //         },
        //     },
        //     async authorize(credentials) {
        //         try {
        //             ConnectMongoDb();
        //             const foundAdmin = (await UserModel.findOne({
        //                 email: credentials?.email,
        //             })
        //                 .lean()
        //                 .exec()) as IUser | null;
        //             console.log("Found admin:", foundAdmin);
        //             if (foundAdmin) {
        //                 const matched = await bcrypt.compare(
        //                     credentials?.password as string,
        //                     foundAdmin.password as string
        //                 ); //Compare passwords

        //                 if (matched) {
        //                     const { _id, name, image, role, email } = foundAdmin; //Eliminate pass
        //                     const safeUser = {
        //                         name,
        //                         image,
        //                         role,//Assign role
        //                         email,
        //                         id: _id,
        //                     };

        //                     //Normal user
        //                     return { ...safeUser };
        //                 } else {
        //                     toast.error("Credentials mismatch!.");
        //                     return null;
        //                 }
        //             } else {
        //                 toast.error("No admin found with that email.");
        //                 return null;
        //             }
        //         } catch (error) {
        //             console.log('Credentials error:', error);
        //             toast.error(`Credentials error: ${getErrorMessage(error as unknown)}`);
        //         }
        //         return null;
        //     },
        // }),
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

