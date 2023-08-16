import axios from 'axios'

/* Posible solución al problema de una vez hecho login, entrar y luego te bota a login 
al refrescar la página  npm i js-cookie */ 

const instance = axios.create({
    //baseURL:'http://localhost:4000/api',
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials: true
})

export default instance 