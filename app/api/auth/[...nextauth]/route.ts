import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: `${process.env.GOOGLE_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    ],

    // create callback functions for session and sign in
    callbacks: {
      async session({ session }: any) {
        const sessionUser = await User.findOne({ email: session.user.email });
  
        session.user.id = sessionUser._id.toString();
  
        return session;
      },
      async signIn({ account,profile }: any) {
        try {

            // connect to db
          await connectToDB();
  
          // check if user exists in db
          const userExists = await User.findOne({ email: profile.email });
  
          if (!userExists) {
            // create new user
            await User.create({
              email: profile.email,
              username: profile.name.replace(/\s/g, "").toLowerCase(),
              image: profile.picture,
            });
          }
  
          if (account.provider === "google") {
            return profile.email_verified && profile.email.endsWith("@gmail.com")
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  });
  
  export { handler as GET, handler as POST };