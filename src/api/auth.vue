import axios from "axios"


export const login = async (token) => await axios.post(`${import.meta.env.VITE_API_URL}/login`,{},{
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const sigup = async (token) => await axios.post(`${import.meta.env.VITE_API_URL}/signup`,{},{
    headers: {
        Authorization: `Bearer ${token}`
    }
})