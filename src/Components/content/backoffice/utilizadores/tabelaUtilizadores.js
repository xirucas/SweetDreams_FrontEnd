export const TabelaUtilizadores = (props) => {
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
                  <th>Nome</th>
                  <th>Apelido</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Tipo</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.nome}</td>
                    <td>{item.apelido}</td>
                    <td>{item.email}</td>
                    <td>{item.telefone}</td>
                    <td>{item.admin===true? "Admin":"Utilizador"}</td>
                    <td>
                      <button className="btn btn-danger" >Eliminar</button>
                      {item.admin===true? <button className="btn btn-danger" style={{marginRight:"18px", marginLeft:"10px"}}>Retirar Admin</button>
                      :<button className="btn btn-danger" style={{marginRight:"10px", marginLeft:"10px"}}>Colocar Admin</button>}
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
