import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { api } from "../../../../Shared/api";

export const TabelaHoteis = (props) => {
  const data = props.data;

  const [Hotel, setHotel] = useState({ "_Id": null, "disponivel": null, "nome": "" });

  const [showDelete, setshowDelete] = useState(false);
  const openshowDelete = (id, nome) => { setshowDelete(true); setHotel({ "_Id": id, "nome": nome }) }
  const closeshowDelete = () => setshowDelete(false)

  const [ShowDisponivel, setShowDisponivel] = useState(false);
  const openShowDisponivel = (id, disponivel, nome) => { setShowDisponivel(true); setHotel({ "_Id": id, "disponivel": disponivel , "nome":nome}) }
  const closeShowDisponivel = () => setShowDisponivel(false)

  const Delete = () => {

    //codigo para apagar

    api.delete("hoteis/" + Hotel._Id).then((res) => {
      window.location.reload(false)
      closeshowDelete()
    }).catch((err) => {
      console.log(err)
    })

  }

  const Disponivel = () => {

    //codigo para retirar ou adicionar disponivel

    let disponivel = { "disponivel": null }

    if (Hotel.disponivel === true) {
      disponivel = { "disponivel": false }
    } else {
      disponivel = { "disponivel": true }
    }


    api.patch("hoteis/" + Hotel._Id, disponivel).then((res) => {
      window.location.reload(false)
      closeShowDisponivel()
    }).catch((err) => {
      console.log(err)
    })

  }



  return (
    <>
      <Modal show={showDelete} onHide={closeshowDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja eliminar o Hotel ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem a certeza que deseja eliminar o Hotel {Hotel.nome} ?</p>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btn btn-secondary" onClick={closeshowDelete}>
            Cancelar
          </button>
          <button variant="primary" className="btn btn-primary" onClick={Delete}>
            Sim e Sair
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={ShowDisponivel} onHide={closeShowDisponivel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {Hotel.disponivel === true ? "Retirar Disponibilidade" : "Colocar Disponibilidade"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Hotel.disponivel === true ? <p>Deseja retirar a disponibilidade do Hotel {Hotel.nome}</p>
            : <p>Deseja colocar a disponibilidade do Hotel {Hotel.nome} ?</p>}
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btn btn-secondary" onClick={closeShowDisponivel}>
            Cancelar
          </button>
          <button variant="primary" className="btn btn-primary" onClick={Disponivel}>
            Sim e Sair
          </button>
        </Modal.Footer>
      </Modal>


          <div className="container">
            <div className="row">
              <div className="col-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome</th>
                      <th>Cidade</th>
                      <th>Disponivel</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr>
                        <td>{item._id}</td>
                        <td>{item.nome}</td>
                        <td>{item.cidade}</td>
                        <td>{item.disponivel === true ? "Sim" : "Não"}</td>
                        <td>
                        <button className="btn btn-danger" onClick={()=> openshowDelete(item._id)}>Eliminar</button>
                        {item.disponivel !== true ? <button className="btn btn-danger mx-2" onClick={()=> openShowDisponivel(item._id, item.disponivel, item.nome)}>Colocar disponivel</button>
                          : <button className="btn btn-danger mx-2" onClick={()=> openShowDisponivel(item._id, item.disponivel, item.nome)}>Colocar indisponivel</button>}
                          <NavLink to={`/backoffice/hoteis/${item._id}`}><button className="btn btn-danger">Editar</button></NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
        );
};
