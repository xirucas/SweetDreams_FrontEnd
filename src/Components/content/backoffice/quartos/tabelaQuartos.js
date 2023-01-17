export const TabelaQuartos = (props) => {
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
                  <th>Preço</th>
                  <th>Disponivel</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.hotel_id}</td>
                    <td>{item.preco}</td>
                    <td>{item.disponivel===true? "Sim":"Não"}</td>
                    <td>
                      <button className="btn btn-danger" >Eliminar</button>
                      {item.disponivel===true? <button className="btn btn-danger" style={{marginRight:"18px", marginLeft:"10px"}}>Colocar disponivel</button>
                      :<button className="btn btn-danger" style={{marginRight:"10px", marginLeft:"10px"}}>Colocar indisponivel</button>}
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
