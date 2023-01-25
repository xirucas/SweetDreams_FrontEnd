import { Paginacao } from "../../../../Shared/paginacao";
import { useState, useEffect } from "react";
import { api } from "../../../../Shared/api";
import { TabelaReservas } from "./tabelaReservas";
import { ScreenLoader } from "../../../loader/loader";
import { NavLink } from "react-router-dom";

export const ListaReservas = () => {

  // inicializa o state para armazenar os dados de utilizadores
  const [dataInicial, setDataInicial] = useState([])
  const [data, setData] = useState([]);
  // inicializa o state para armazenar o status de carregamento
  const [loading, setLoading] = useState(true);

  // inicializa o state para armazenar a página atual
  const [currentPage, setCurrentPage] = useState(1);
  // inicializa o state para armazenar a quantidade de records por página
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    api.get("reservas")
      .then((res) => {
        setData(res.data);
        setDataInicial(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filtro = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value !== "") {
      api.get(`reservas/hotel/${value}`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setData(dataInicial)
    }
  };

  // calcula o índice do último record na página atual
  const indexOfLastRecord = currentPage * recordsPerPage;
  // calcula o índice do primeiro record na página atual
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // seleciona os records atuais baseado no índice calculado
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  // calcula o número total de páginas baseado na quantidade de records e a quantidade por página
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <>
      {loading ? <ScreenLoader /> : (
        <div className="container mt-5 mb-3">
          <div className="row align-baseline">
            <div className="col-10" >
              <h2 className="m-0"> Lista de Reservas</h2>
            </div>
            <div style={{ display: "flex" }} className="col-2 justify-content-end align-content-end">
              <NavLink to={"/backoffice/reservas/add"}><button className="btn btn-primary ">Criar Reserva</button></NavLink>
            </div>
          </div>
          <div className="col-3 mt-3">
            <div style={{ display: "flex" }} className="align-items-center">
              <label style={{ marginRight: "10px" }} htmlFor="hotel"><h4>Hotel:</h4></label>
              <input

                placeholder="Id do hotel"
                type="text"
                className="form-control"
                id="hotel"
                name="hotel"
                onChange={filtro}
              />
            </div>
          </div>
        </div>)}
      <TabelaReservas data={currentRecords} />
      <Paginacao
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </>
  );
};
