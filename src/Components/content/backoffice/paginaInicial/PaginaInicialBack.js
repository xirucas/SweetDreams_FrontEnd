import "./PaginaInicialBack.css"

export const PaginaInicialBack = () => {
    return(
        <div className="Back-Main">
            <div className="info-card"> 
            <div className="BackOfficeMain-Header">
                <h1>Central de Administração</h1>
                <h3>Navegue por esta página utilizando a aba exclusiva encontrada em cima</h3> 
            </div>
                <div className="conteiner-card">            
                    <h4>Nesta página você pode :</h4>
                    <ul id="main-ul">
                        <li className="main-li"> Gerenciar Utilizadores selecionando "Utilizadores"</li>
                        <li className="main-li"> Gerenciar Hoteis selecionando "Hoteis" </li>
                        <li className="main-li"> Gerenciar Hoteis selecionando "Quartos" </li>
                        <li className="main-li"> Gerenciar Reservas selecionando "Reservas" </li>
                    </ul>  
                </div>

            </div>
        </div>
    )
}