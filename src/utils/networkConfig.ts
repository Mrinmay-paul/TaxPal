export const baseurl = process.env.BASE_URL || 'http://localhost:3000/api';

export const API_END_POINTS = {
    auth: {
        login: '/auth/sign-in',
        signup: '/auth/sign-up',
        sendVerificationMail: '/auth/verification',
        logout: '/auth/log-out',
    }
}