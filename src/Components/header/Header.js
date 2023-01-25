import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Autenticacao } from "../autenticacao/autenticacao";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export const Header = (props) => {
  const user = props.user;
  const isAdmin = user?.admin ? true : false;

  const { Logout } = Autenticacao();

  const navigate = useNavigate();

  const redirectpage = () => {
    navigate("/");
    Logout();
  };

  const BoasVindas = () => {
    var data = new Date();
    var hora = data.getHours();
    if (hora >= 7 && hora < 12) {
      return "Bom dia";
    } else {
      if (hora >= 12 && hora < 18) {
        return "Boa tarde";
      } else {
        return "Boa noite";
      }
    }
  };

  const boas = BoasVindas();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">SweetDreams</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-start">
              <NavLink className={"nav-link"} to="/">Página Inicial</NavLink>
              <NavLink className={"nav-link"} to="/contactos">Contactos</NavLink>
              <NavLink className={"nav-link"} to="/sobrenos">Sobre Nos</NavLink>

              {isAdmin ? (
                <NavDropdown title="Administração" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/backoffice">
                    Página Inicial
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/backoffice/users">
                    Utilizadores
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/backoffice/hoteis">
                    Hoteis
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/backoffice/quartos">
                    Quartos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/backoffice/reservas">
                    Reservas
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>

          {user !== null ? (
            <NavDropdown
              title={`${boas} ${user.nome} ${user.apelido}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/perfil">O meu perfil</NavDropdown.Item>
              <NavDropdown.Item href="/perfil/editar">
                Editar conta
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => redirectpage()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav className="justify-content-end">
              <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/registrar">Registrar</Nav.Link>
              </Navbar.Collapse>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};
