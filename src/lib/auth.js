import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"


const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Book-Nook");



export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

 trustedOrigins: [
    "http://localhost:3000",
    "https://book-nook-client-dant.vercel.app/",
  ],


  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    jwt(),
  ],
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },




});