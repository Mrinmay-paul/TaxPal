import mongoose,{Schema} from 'mongoose';

interface IOTP {
    email: string;
    otp: string;
    expiresAt: Date;
}

const otpSchema = new Schema<IOTP>({
    email:{
        type: String,
        required: [true, 'Email is required.'],
    },
    otp: {
        type: String,
        required: [true, 'OTP is required.'],
    },
    expiresAt:{
        type: Date,
        required: [true, 'Expiration time is required.'],
    }
})

const OTPModel = (mongoose.models.OTP as mongoose.Model<IOTP>) || (mongoose.model<IOTP>('OTP', otpSchema));
export default OTPModel;