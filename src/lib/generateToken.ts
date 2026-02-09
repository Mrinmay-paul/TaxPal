import jwt from "jsonwebtoken";


export function generateToken(payload : {_id: string, email: string}){
    const token = jwt.sign({
        userId: payload._id,
        email: payload.email
        },
        process.env.JWT_SECRET_KEY || '',
        {expiresIn: '7d'}
    )
    return token;
}