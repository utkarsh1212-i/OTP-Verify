import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://otp-verify-backend.vercel.app', // Server URL
});

export default instance;