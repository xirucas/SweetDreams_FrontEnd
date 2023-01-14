import { useEffect, useState } from "react"
import { Autenticacao } from "./autenticacao"

export const AuthStatus = () => {
    
    const {user} = Autenticacao();

    const [isLogged,setIsLogged]=useState(false)
    const [verificandoStatus, setVerificandoStatus]=useState(true)

    
    useEffect(()=>{
        if (user) {
            setIsLogged(true)
            } else {
                setIsLogged(false)
            }
            setVerificandoStatus(false)
    },[user])

    return { isLogged, verificandoStatus }
}