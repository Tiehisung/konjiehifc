import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/models/user";
import { Account, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { IUser } from "@/types/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      async profile(profile) {
        const foundAdmin = (await UserModel.findOne({
          email: profile?.email,
        })
          .lean()
          .exec()) as IUser | null;
        if (foundAdmin) {
          const { _id, name, image, role, email } = foundAdmin;
          const safeUser = {
            name,
            image: image ?? profile.picture,
            role,
            email,
            id: _id as string,
          };

          return safeUser;
        }
        return {
          ...profile,
          id: profile.sub,

        };
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    //Credentials
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter valid email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        
      },
      async authorize(credentials) {
        try {
          const foundAdmin = (await UserModel.findOne({
            email: credentials?.email,
          })
            .lean()
            .exec()) as IUser | null;
          if (foundAdmin) {
            const matched = await bcrypt.compare(
              credentials?.password as string,
              foundAdmin.password as string
            );
            //Compare passwords
            if (matched) {
              //Assign role
              const { _id, name, image, role, email } = foundAdmin; //Eliminate pass
              const safeUser = {
                name,
                image,
                role,
                email,
                id: _id as string,
              };

              //Normal user
              return { ...safeUser };
            }
          }
        } catch (error) {
          console.log("Credentials error:", error);
        }
        return null;
      },
    }),
  ],

  callbacks: {
    //To be used at server
    async jwt({ token, user, }: {
      token: JWT;
      user?: IUser | User | AdapterUser;
      account?: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: Session;
    }) {
      // If your logic depends on custom IUser fields, check and assign them only if present
      if (user && 'role' in user) {
        token.role = (user as IUser).role;
        token.id = (user as IUser & { id: string }).id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as IUser).role = token.role as IUser['role'];
      }
      return session;
    },
  },
};
