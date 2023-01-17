import { useState } from "react";
import { Outlet} from "react-router-dom";
import { ScreenLoader } from "../../loader/loader";

export const  ApenasAdmin = (props) => {
  const {isAdmin, isLogged} = props.is
  
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 1000);

  return (
    <>
{isLoading? <ScreenLoader></ScreenLoader> : (isAdmin && isLogged ? <Outlet /> : <h1>Not Authorized</h1>)}
      
    </>
  )
  
};
