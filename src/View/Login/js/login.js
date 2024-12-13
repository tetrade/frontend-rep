import axios from '@/API/axios.js'

export async function login (login, password) {
    const response = await axios.post('/login',{login, password}, {withCredentials: true})
    if (response.status === 200) {
        localStorage.setItem('isAuth', "true");
    } else {
        localStorage.removeItem('isAuth');
    }
    return response.data
}