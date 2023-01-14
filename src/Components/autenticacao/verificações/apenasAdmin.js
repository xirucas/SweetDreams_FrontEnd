import { Outlet, useNavigate } from "react-router-dom";
import { AuthStatus } from "../authStatus"

export const ApenasAdmin = () => {
  const { isLogged, verificandoStatus } = AuthStatus()
  const navigate = useNavigate();
  if (isLogged) {

    //fazer ligaçao com autenticao ao servidor
    const userInfo = null;

    return userInfo?.isAdmin ?
    ( <Outlet />) 
    :(
        <navigate to={<h1>Sem permições</h1>} />
      );
  }else{
    return navigate("/login")
  }
};
