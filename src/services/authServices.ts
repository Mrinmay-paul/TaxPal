import api from "@/utils/apiRequest";
import { API_END_POINTS } from "@/utils/networkConfig";


export const authServices =  {
    signUp:(data: any)=> api.post(API_END_POINTS.auth.signup, data),
    login:(data: any)=> api.post(API_END_POINTS.auth.login, data),
    sendVerificationMail:(data: any)=> api.post(API_END_POINTS.auth.sendVerificationMail, data),
}