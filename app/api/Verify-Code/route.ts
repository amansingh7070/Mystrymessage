import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";

export async function POST(request: Request){
    await dbConnect()
    
    try{
       const {username, code} = await request.json() 
       const decodedUsername = decodeURIComponent(username)
       await UserModel.findOne({username: decodedUsername})
       if (!username){
        return Response.json(
            {
                success: false,
                message: "User not found"
            },
            {status: 500}
        )
       }

       const isCodeValid = username.isVerified==code
       const isCodeNotExpired = new Date(username.
        isVerified) > new Date()
       if (isCodeValid && isCodeNotExpired){
        username.isVerifed = true
        await username.save()

        return Response.json(
            {
                success: true,
                message: "Account verified successfully"
            },
            {status: 200}
        )
       } else  if (!isCodeNotExpired){
        return Response.json(
            {
                success: false,
                message: "Verification code is expired please signup again to get a new"
            },
            {status: 400}

        )
       } else {
        return Response.json(
            {
                success: false,
                message: "Incorrect Verification code"
            },
            {status : 400}
        )
       }

    } catch (error){
        console.error("Error verifying user", error)
        return Response.json(
            {
            success: false,
            message: "Error verifying user"
        },
        { status: 500}

        )

    }
}