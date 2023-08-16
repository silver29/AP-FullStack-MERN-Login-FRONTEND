import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

// Hace uso del contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context; 
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    /* Posible solución al problema de una vez hecho login, entrar y luego te bota a login 
    al refrescar la página */ 
    const [loading, setLoading] = useState(true);

    /* 2:27:26 Almacena la información de usuario (registrado) de forma temporal, al refrescar la página se pierde. */
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            if(Array.isArray(error.response.data)) {
                //console.error(error.response.data)    
            return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]) 
        }
    }
    
    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            },5000)
            return () => clearTimeout(timer)
        }
    },[errors])

    /* Posible solución al problema de una vez hecho login, entrar y luego te bota a login 
    al refrescar la página  npm i js-cookie */ 
    useEffect(() => {
       async function checkLogin() {
            const cookies = Cookies.get();

            // Comprueba si no hay un token
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            console.log(cookies);
            //console.log(cookies.token);
            try {
                // Si hay un token se envia para que se verifique en el BACKEND si este es válido. 
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if(!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                //isAuthenticated(true);
                // Si el token es correcto entonces:
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                // Si hay algún error
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    },[]);

    return (
        <AuthContext.Provider 
            value={{
                signup,
                signin,
                logout,
                loading,
                user,
                isAuthenticated,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider> 
    )
}