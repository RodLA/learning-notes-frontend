import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    //headers: {'X-Custom-Header':'foodar'}
});

//Intercepta cada peticion realizada al BACK (antes de recibir respuesta)
ax.interceptors.request.use( function (config){
    
    const token = localStorage.getItem('token');
    if(token){
        //axios.defaults.headers.common['Authorization'] = token ? token.access_token : '';
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

}, function(error){
    return Promise.reject(error);
} );

export default ax;