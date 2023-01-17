export const Paginacao = ({ nPages, currentPage, setCurrentPage })=>{

    // cria um array com o número de páginas existentes
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    // função para ir para a próxima página
    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    // função para ir para a página anterior
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link" 
                        onClick={prevPage} 
                        href=''>
                        
                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >
                        <a onClick={() => setCurrentPage(pgNumber)}  
                            className='page-link' 
                            href=''>
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" 
                        onClick={nextPage}
                        href=''>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}