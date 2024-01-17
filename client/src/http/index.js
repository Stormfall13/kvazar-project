import axios from 'axios';

const $host = axios.create({
    baseURL: 'http://localhost:5000/'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:5000/'
})

const authInterceptor = config => {
    console.log(`Bearer ${localStorage.getItem('token')}`)
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config

    
    // const token = localStorage.getItem('token');

    // if (token) {
    //     config.headers['Authorization'] = `Bearer ${token}`;
    // } else {
    //     console.log('No token found, redirecting to login ...');
    //     // Если это web-приложение, возможно, вы хотите сделать перенаправление:
    //     // window.location = '/login';
    // }

    // return config;
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}