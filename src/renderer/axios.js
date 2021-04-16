import axios from 'axios';
import store from './store'
import $electron from './vueElectron'
const isDev = process.env.NODE_ENV === 'development';
let url = 'https://gos24.kz/api/v2';

if (isDev) {
    // url = 'http://localhost:8000/api/v2';
    url = 'http://test.gos24.kz/api/v2';
}
const $axios = axios.create({
    baseURL: url
});

$axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
$axios.defaults.xsrfCookieName = 'csrftoken';
$axios.defaults.withCredentials = true;

function getAuthToken () {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    return $axios.post('user/refreshAccessToken/', {
        username: user.username,
        refresh: localStorage.getItem('refreshToken')
    }).catch(e => {
        throw new Error(e)
    })
}
async function logoutOfProgram () {
    await store.commit('LOGOUT_USER');
    await $electron.ipcRenderer.send('page-auth');
}

$axios.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
        delete config.headers.Authorization
    }
    return config;
});
$axios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    console.log(error.response);
    if (error.response.status === 401 && error.response.data.code === 'token_not_valid' && error.response.data.detail !== 'Token is invalid or expired' && !error.config.__isRetryRequest) {
        try {
            const response = await getAuthToken();
            const accessToken = response.data.access;
            await store.commit('STORE_ACCESS_TOKEN', response.data.access);
            error.config.headers['Authorization'] = 'Bearer ' + accessToken ? accessToken : '';
            error.config.__isRetryRequest = true;
            return $axios(error.config)
        } catch (error) {
            await logoutOfProgram();
            return await Promise.reject(error)
        }
    }
    if ((error.response.status === 401 && error.response.data.code === 'token_not_valid' && error.response.data.detail === 'Token is invalid or expired') || (error.response.status === 401 && error.response.data.detail === 'Учетные данные не были предоставлены.')) {
        await logoutOfProgram();
        return await Promise.reject(error)
    }
    return Promise.reject(error);
});

export default $axios
