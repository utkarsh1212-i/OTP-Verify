import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000', // Server URL
});

export default instance;