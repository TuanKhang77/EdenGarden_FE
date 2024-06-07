import axios from "axios";

const instance = axios.create({
    // baseURL: "https://localhost:5001/api",
    baseURL: "https://be-production-464b.up.railway.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
