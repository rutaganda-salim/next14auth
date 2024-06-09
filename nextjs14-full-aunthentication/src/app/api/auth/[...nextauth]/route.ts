import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/auth/signin"
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "User Name",
                    type: "text",
                    placeholder: "Your user Name",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Your Password"
                },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username,
                    },
                });

                if (!user) throw new Error("Username or password is not correct");

                if (!credentials?.password) throw new Error("Please provide your password");

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordCorrect) throw new Error("Username or password is not correct");

                // If the user is found and password is correct, return the user object
                const { password, ...userWithoutPass } = user;
                return userWithoutPass;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user as User;
            return token;
        },

        async session({ token, session }) {
            session.user = token.user
            return session;
        },
    },
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

