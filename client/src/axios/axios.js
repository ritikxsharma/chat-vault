import axios from "axios";

export const auth_axios = axios.create(
    {
        baseURL: 'https://chat-app-server-mfph.onrender.com/api/auth',
        //baseURL: 'http://localhost:5001/api/auth',
        timeout: 5000        
    }
)
