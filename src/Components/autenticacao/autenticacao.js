import { useEffect, useState } from "react";
import { api } from "../../Shared/api.js";

export const Autenticacao = () => {

  const [user, setUser] = useState(null);

  

  useEffect(() => {
    CheckToken();
  }, []);

  const CheckToken = async () => {
    const token = await localStorage.getItem("token");

    if (token) {
      api.defaults.headers["authorization"] = `${token}`;
      const user = await api
        .get("utilizador/getprofile")
        .then((res) => res.data);
      setUser(user);
    }
  };

  const Login = async (email, password) => {
    const user = await api
      .post("utilizador/login", { email, password })
      .then((res) => res.data);
    setUser(user);
    localStorage.setItem("token", user.token);
    api.defaults.headers["authorization"] = `Bearer ${user.token}`;

    
  };

  const Logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    api.defaults.headers["authorization"] = undefined;
    return window.location.reload(false);
  };

  return {
    user,
    Login,
    Logout,
  };
  
};
