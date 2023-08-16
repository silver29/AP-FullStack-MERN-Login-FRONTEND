//import axios from 'axios'

import axios from "./axios";

//const API = 'http://localhost:4000/api'
// Parametro user del body request
// export const registerRequest = user => axios.post(`${API}/register`, user);

export const registerRequest = user => axios.post(`/register`, user);

// export const loginRequest = user => axios.post(`${API}/login`,user);

export const loginRequest = user => axios.post(`/login`,user);

/* Posible solución al problema de una vez hecho login, entrar y luego te bota a login 
    al refrescar la página  npm i js-cookie */ 

export const verifyTokenRequest = () => axios.get('/verify')