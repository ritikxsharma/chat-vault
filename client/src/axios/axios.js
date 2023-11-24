import axios from "axios";

export const auth_axios = axios.create(
    {
        //baseURL: 'https://chat-app-server-mfph.onrender.com',
        baseURL: 'http://localhost:5001',
        timeout: 5000,       
    }
)
