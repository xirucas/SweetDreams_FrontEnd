import { useState } from "react";
import { useNavigate, Outlet} from "react-router-dom";
import { ScreenLoader } from "../../loader/loader";

export const  VerificaLogin = (props) => {
  const isLogged = props.is
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 1000);

  return (
    <>
{isLoading? <ScreenLoader></ScreenLoader> : (isLogged ? <Outlet /> : navigate("/login"))}
      
    </>
  )
  
};
