export const TabelaReservas = (props) => {
  const data = props.data;
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
                    <td>{item.estado/*colocar condições aqui e modificar botao*/}</td>
                    <td>
                      <button className="btn btn-danger" >Eliminar</button>
                      <button className="btn btn-danger">Modificar estado</button>
                      <button className="btn btn-danger">Editar</button>
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
