import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                // Connect to the database
                await dbConnect();

                // Find user by email
                const user = await UserModel.findOne({ email: credentials.username });
                if (!user) {
                    throw new Error("No user found with this email");
                }

              if(!user.isVerified){
                throw new Error('Please verify your account before login')
              }

                // // Verify password
                // const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                // if (!isValidPassword) {
                //     throw new Error("Invalid credentials");
                // }

                const isPasswordCorrect= await bcrypt.compare(credentials.password, user.password)
                if (isPasswordCorrect){
                    return user
                } else{
                   throw new Error('Incorrect Password')  
                }

                // // Return user object
                // return {
                //     id: user._id,
                //     name: user.name,
                //     email: user.email,
                //};
            }
        })
    ],
    
    callbacks:{
          async jwt({token, user, }){
            if(user){
                token._id= user._id?.toString()
                token.isVerified= user.isVerified;
                token.isAcceptingMesage= user.
                isAcceptingMessage;
                token.username= user.username
            }
            return token
          },

        async session({session,  token}){
           if(token){
            session.user._id= token._id
            session.user.isVerified = token.isVerified
            session.user.isAcceptingMesage = token.isAccceptingmessages
            session.user.username = token.username 

           }
           return session
        },

    },



    pages: {
        signIn: '/sign-in'
    },

    session:{
        strategy: "jwt"
    },
     
    secret: process.env.NEXTAUTH_SECRET,



};
