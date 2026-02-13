export const baseurl = process.env.BASE_URL || 'http://localhost:3000/api';

export const API_END_POINTS = {
    auth: {
        login: '/auth/login',
        signup: '/auth/sign-up',
        sendVerificationMail: '/auth/verification',
    }
}