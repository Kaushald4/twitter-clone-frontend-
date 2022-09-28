import axios from "axios";

const instance = axios.create({
    baseURL: `https://twitter-backend.onrender.com/api/v1`,
    // baseURL: `http://localhost:5000/api/v1`,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://twitter-backend.onrender.com",
    },
    withCredentials: true,
});

export default instance;
