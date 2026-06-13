import axios from "axios";

const api = axios.create({
    baseURL: "https://expense-tracker-backend-nd8c.onrender.com"
});

export default api;