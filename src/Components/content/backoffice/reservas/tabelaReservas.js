import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from '../../../../Shared/api';

export const TabelaReservas = (props) => {
  const data = props.data;

  const estados = ["Cancelada", "Pendente", "Confirmada", "Negada"]


  const alterarEstado = (id,estado)=>{
    //codigo para alterar estado

    const estadoFinal = {"estado":estado}

    api.patch("reservas/"+id, estadoFinal).then((res)=>{
      console.log(res)
      window.location.reload(false)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Id Hotel</th>
                  <th>Id Quarto</th>
                  <th>Id Utilizador</th>
                  <th>Data Entrada</th>
                  <th>Data Saida</th>
                  <th>Preço</th>
                  <th>Nº Pessoas</th>
                  <th>Estado</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.hotel_id}</td>
                    <td>{item.quarto_id}</td>
                    <td>{item.utilizador_id}</td>
                    <td>{item.data_entrada}</td>
                    <td>{item.data_saida}</td>
                    <td>{item.preco}</td>
                    <td>{item.numero_pessoas}</td>
                    <td><Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {item.estado}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {estados.map((estado) => (
                          <Dropdown.Item onClick={()=>alterarEstado(item._id, estado)} >{estado}</Dropdown.Item>
                        ))}

                      </Dropdown.Menu>
                    </Dropdown>
                    </td>
                    <td>
                      <button className="btn btn-danger" >Eliminar</button>
                      <NavLink to={`/backoffice/reservas/${item._id}`}> <button className="btn btn-danger">Editar</button></NavLink>
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
