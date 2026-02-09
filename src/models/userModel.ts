import mongoose,{Schema, Document} from "mongoose";

export interface User extends Document{
    userName: string;
    password: string;
    fullName: string;
    email: string;
    token: string;
    verificationCode: string;
    isVerified: boolean;
    verificationCodeExpiery: Date;
    country: string;
    incomeBracket?: string;
    createdAt: Date;
}

const UserSchema : Schema<User> = new Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    fullName:{
        type: String,
        required: [true, "Full Name is required"]
    },
    email:{
        type: String,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        required: [true, "Email is required"]
    },
    token: {
        type: String,
        required: [true, 'Token is required.']
    },
    // verificationCode:{
    //     type: String,
    //     required: [true, "Verification Code is required."]
    // },
    isVerified:{
        type: Boolean,
        default: false
    },
    // verificationCodeExpiery:{
    //     type: Date,
    //     required: [true, 'Verification code expiry is required']
    // },
    country:{
        type: String,
        required: [true, 'Country is required']
    },
    incomeBracket:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || ( mongoose.model<User> ('User', UserSchema))

export default UserModel;