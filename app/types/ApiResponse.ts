import {Message} from "@/app/model/User"
export interface ApiResponse{
    success: boolean;
    message: string;
    isAccesptingMessages?: boolean 
    Message?: Array<Message>

}