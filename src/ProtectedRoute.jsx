import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
    const {loading , isAuthenticated} = useAuth();
    console.log(loading,isAuthenticated);
    /* Posible solución al problema de una vez hecho login, entrar y luego te bota a login 
    al refrescar la página */ 
    if(loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated) return <Navigate to='/login' replace />

    return <Outlet />;
  
}

export default ProtectedRoute;