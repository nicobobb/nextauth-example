import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../../../config/connectDB";
import Users from "../../../models/userModel";
import bcrypt from "bcrypt";

connectDB();

export default NextAuth({
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  // SQL or MongoDB database (or leave empty)
  database: process.env.DATABASE_URL,
  callbacks: {
    session: async (session, user) => {
      // const resUser = await Users.findById(user.sub)
      // session.emailVerified = resUser.emailVerified
      session.userId = user.sub;
      return Promise.resolve(session);
    },
  },
});

const registerUser = async ({ email, password }) => {
  const hashPass = await bcrypt.hash(password, 12);
  const newUser = new Users({ email, password: hashPass });
  await newUser.save();
  throw new Error("Success! Check your email.");
};
