import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/app/helper/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()

    try{

    const {username, email, password} = await request.json
    ()
    const exitingUserVerifiedByUsername = await UserModel.
    findOne({
        username,
        isVerified: true
    })
     
    if (exitingUserVerifiedByUsername){
        return Response.json({
            success: false,
            message: "Username is already taken"
          },{status: 400})
    }

    const existingUserByEmail = await UserModel.findOne
    ({email})

    const verifyCode = Math.floor(100000 + Math.random() * 9000000).toString()
  
    if (existingUserByEmail) {
       if(existingUserByEmail.isVerified){
        return Response.json({
            success: false,
            message: "User already exit with this email"

          },{status: 400})
       }else{
        const hasedPassword = await bcrypt.hash
        (password, 10)
        existingUserByEmail.password = hasedPassword;
        existingUserByEmail.verfyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new
        Date(Date.now() + 3600000)
        await existingUserByEmail.save()
       } 

    } else{
        const hasedPassword = await bcrypt.hash(password, 10)
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() +1)

        const newUser = new UserModel({ 
            username,
            email, 
            password: hasedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            messages: []

        })

        await newUser.save()

    }
   
    // Send verification email

    const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
    )
   if (!emailResponse.success){
       return Response.json({
        success: false,
        message: "Username is already taken"

       },{status: 500})

   }

   return Response.json({
      success: true,
      message: "user registered successfully, Please verify your email"
   },{status: 201})


    }catch (error){
        console.error('Error registering user', error)
        return Response.json(
            {
                success: false,
                message: "Error registering"
            },
            {
                status: 500
            }

        )
    }

}