import axios from "axios";

const url = "https://sweetdreams-backend.onrender.com"

export const api =axios.create({
    baseURL: url
})