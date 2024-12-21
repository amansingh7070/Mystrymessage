import {getServerSession} from "next-auth";
import { authOptions } from "../sign-up/auth/[...nextauth]/options";
import UserModel from "@/app/model/User";
import dbConnect from "@/app/lib/dbConnect";
import { User } from "next-auth";

export async function POST(request:Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user:User = session?.user

    if(!session || !session.user){
        return Response.json(
        {
         success: false,
         message: "Not Authenticated"
        },
        {status: 401}
    )

}
 const userId = user._id; 
 const {acceptMessages} = await request.json()
 try {
    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {isAcceptingMessage: acceptMessages},
        {new : true}
    )
    if (!updatedUser){
        return Response.json(
            {
                success: false,
                message: "failed to update user status to accepts message"
            },
            {status: 401}
        )
    }
        return Response.json(
            {
                success: true,
                message: "Message acceptance status updated successfully",
                updatedUser
            },
            {status: 200}
        )

    

 } 
 catch (error) {
    console.log("failed to update user status to accept message")
    return Response.json(
        {
            success: false,
            message: "failed to update user status to accept message"

        },
        {status: 500 }
    )
 }
}

export  async function GET(request: Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || session.user){
        return Response.json(
            {
                success: false,
                message: "Not Authentication"
            },
            {status: 401}
        )
    }

    const userId = user._id; 
    const foundUser = await UserModel.findById(userId)
    if (!foundUser){
        return Response.json(
            {
               success: false,
               message: "User not found" 
            },
            {status: 404}
        )
    }
}


















