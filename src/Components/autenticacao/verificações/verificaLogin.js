import { Outlet, useNavigate } from "react-router"
import { AuthStatus } from "../autenticaçao/authStatus"

export const VerificaLogin = () => {
    const navigate = useNavigate();
    const { isLogged, verificandoStatus } = AuthStatus()

    if(verificandoStatus){
        return <h1>Verificando status... loading</h1>
    }

    return isLogged ? <Outlet/> : navigate("/login")
}