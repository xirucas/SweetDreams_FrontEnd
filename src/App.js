import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Header } from "./Components/header/Header";
import { Footer } from "./Components/footer/Footer";

import { Contactos } from "./Components/contactos/Contactos";
import { SobreNos } from "./Components/sobrenos/SobreNos";
import { PaginaInicialBack } from "./Components/content/backoffice/paginaInicial/PaginaInicialBack";
import { PaginaInicial } from "./Components/content/end-user/PaginaInicial";
import { Registro } from "./Components/login-registro/registro";
import { LoginUser } from "./Components/login-registro/login";

import "bootstrap/dist/css/bootstrap.min.css";


import { Autenticacao } from "./Components/autenticacao/autenticacao";
import { ApenasAdmin } from "./Components/autenticacao/verificações/apenasAdmin";
import { NotFound } from "./Components/404/404";

function App() {
  const { user } = Autenticacao();

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header user={user}></Header>
          <div className="Content">
            <Routes>
            <Route path='*' element={<NotFound />}/>
              <Route path="/" element={<PaginaInicial></PaginaInicial>} />
              <Route path="contactos" element={<Contactos></Contactos>} />
              <Route path="/sobrenos" element={<SobreNos></SobreNos>} />
              <Route path="/login" element={<LoginUser></LoginUser>} />
              <Route path="/registrar" element={<Registro></Registro>} />
              <Route path="/backoffice" element={<ApenasAdmin></ApenasAdmin>}>
                <Route
                  path="/backoffice"
                  element={<PaginaInicialBack></PaginaInicialBack>}
                />
              </Route>
              <Route path="/backoffice" element={<h1>apenas admin</h1>}>
                <Route path="/backoffice/users" element={<h1>users</h1>} />
              </Route>
              <Route path="/backoffice" element={<h1>apenas admin</h1>}>
                <Route path="/backoffice/hoteis" element={<h1>hoteis</h1>} />
              </Route>
              <Route path="/backoffice" element={<h1>apenas admin</h1>}>
                <Route path="/backoffice/quartos" element={<h1>quartos</h1>} />
              </Route>
              <Route path="/backoffice" element={<h1>apenas admin</h1>}>
                <Route
                  path="/backoffice/reservas"
                  element={<h1>reservas</h1>}
                />
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
