import axios from "axios";

export const auth_axios = axios.create(
    {
        baseURL: 'https://chat-app-server-mfph.onrender.com/api/auth',
        timeout: 5000        
    }
)
