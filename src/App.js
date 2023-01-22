import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Header } from "./Components/header/Header";
import { Footer } from "./Components/footer/Footer";
import { useEffect, useState } from "react";

import { ScreenLoader } from "./Components/loader/loader";

import { Autenticacao } from "./Components/autenticacao/autenticacao";
import { VerificaLogin } from "./Components/autenticacao/verificacoes/verificaLogin";
import { ApenasAdmin } from "./Components/autenticacao/verificacoes/apenasAdmin";

import { LoginUser } from "./Components/login-registro/login";
import { Registro } from "./Components/login-registro/registro";

import { PaginaInicial } from "./Components/content/end-user/PaginaInicial";
import { Contactos } from "./Components/contactos/Contactos";
import { SobreNos } from "./Components/sobrenos/SobreNos";

import { PaginaInicialBack } from "./Components/content/backoffice/paginaInicial/PaginaInicialBack";
import { ListaUtilizadores } from "./Components/content/backoffice/utilizadores/listaUtilizadores";
import { ListaHoteis } from "./Components/content/backoffice/hoteis/listaHoteis";
import { ListaQuartos } from "./Components/content/backoffice/quartos/listaQuartos";
import { ListaReservas } from "./Components/content/backoffice/reservas/listaReservas";

import { NotFound } from "./Components/404/404";

import "bootstrap/dist/css/bootstrap.min.css";

import { EditarCriarUsers } from "./Components/content/backoffice/utilizadores/editarCriarUsers";
import { EditarCriarHoteis } from "./Components/content/backoffice/hoteis/editarCriarHoteis";
import { EditarCriarQuartos } from "./Components/content/backoffice/quartos/editarCriarQuartos";
import { EditarCriarReservas } from "./Components/content/backoffice/reservas/editaCriarReservas";


function App() {

  const { user } = Autenticacao();
  
  const [isLogged, setIsLogged] = useState();

  const [isAdmin, setIsAdmin] = useState()

  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    if(user){
      setIsLogged(true)
      if(user.admin){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    }else{
      setIsLogged(false)
      setIsAdmin(false)
    }
  }, [user])
  

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [])
  

  return (
    <>
    
      <BrowserRouter>
        <div className="App">
          <Header user={user}></Header>
          <div className="Content">
          
            <Routes>
            <Route path='*' element={<NotFound />}/>
           
              <Route index element={ isLoading? <ScreenLoader></ScreenLoader> : <PaginaInicial></PaginaInicial>}  />
              <Route path="/contactos" element={isLoading? <ScreenLoader></ScreenLoader> : <Contactos></Contactos>} />
              <Route path="/sobrenos" element={isLoading? <ScreenLoader></ScreenLoader> : <SobreNos></SobreNos>} />
              <Route path="/login" element={<LoginUser></LoginUser>} />
              <Route path="/registrar" element={<Registro></Registro>} />
              <Route path="/perfil" element={<VerificaLogin is={isLogged}></VerificaLogin>}>
                <Route
                  path="/perfil"
                  element={isLoading? <ScreenLoader></ScreenLoader> : <h1>perfil</h1>}
                />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route
                  path="/backoffice"
                  element={isLoading? <ScreenLoader></ScreenLoader> : <PaginaInicialBack></PaginaInicialBack>}
                />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/users" element={<ListaUtilizadores></ListaUtilizadores>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/users/:id" element={<EditarCriarUsers></EditarCriarUsers>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/users/add" element={<EditarCriarUsers></EditarCriarUsers>} />
              </Route>

              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/hoteis" element={<ListaHoteis></ListaHoteis>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/hoteis/:id" element={<EditarCriarHoteis></EditarCriarHoteis>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/hoteis/add" element={<EditarCriarHoteis></EditarCriarHoteis>} />
              </Route>

              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/quartos" element={<ListaQuartos></ListaQuartos>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/quartos/:id" element={<EditarCriarQuartos></EditarCriarQuartos>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/quartos/add" element={<EditarCriarQuartos></EditarCriarQuartos>} />
              </Route>

              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route
                  path="/backoffice/reservas"
                  element={<ListaReservas></ListaReservas>}
                />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/reservas/:id" element={<EditarCriarReservas></EditarCriarReservas>} />
              </Route>
              <Route path="/backoffice" element={<ApenasAdmin is={{isLogged, isAdmin}}></ApenasAdmin>}>
                <Route path="/backoffice/reservas/add" element={<EditarCriarReservas></EditarCriarReservas>} />
              </Route>

            </Routes>
          </div>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
