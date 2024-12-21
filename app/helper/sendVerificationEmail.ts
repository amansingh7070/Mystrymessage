import {resend} from "@/app/lib/resend";

import VerificationEmail from "../../app/emails/VerificationEmail";

import { ApiResponse } from "../types/ApiResponse";


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'your@example.com',
            to: 'user@gmail.com',
            subject: 'hello world',
            react: VerificationEmail({username, otp: verifyCode})

        });
        return {success: true, message: 'Verification email send successfully'}

    }catch (emailError){
        console.error("Error sending verification email",
            emailError)
            return {success: false, message: 'Failed to send verification email'}


    }
}