import jwt from "jsonwebtoken";


export function generateToken(payload : {userName: string, email: string}){
    const token = jwt.sign({
        userName: payload.userName,
        email: payload.email
        },
        process.env.JWT_SECRET_KEY || '',
        {expiresIn: '7d'}
    )
    return token;
}