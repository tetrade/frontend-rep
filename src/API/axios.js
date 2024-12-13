import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.response.use(
    response => response,
    (error) => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem('isAuth')
            error.response.cookie.remove('jwt');
        }
        return Promise.reject(error)
    }
)

axiosInstance.defaults.withCredentials = true

export default axiosInstance