import { useEffect, useState } from "react";
import { Badge, Carousel, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { api } from "../../../Shared/api";
import { ScreenLoader } from "../../loader/loader";
import "./PaginaHotel.css"

export const PaginaHotel = () => {
    const params = useParams();

    const hotelId = params.id

    const [loading, setLoading] = useState(true);

    const [hotel, setHotel] = useState({})

    const [quartoHotel, setQuartosHotel] = useState([])

    useEffect(() => {
        api.get("hoteis/" + hotelId).then((res) => {
            setHotel(res.data);

            api.get("quartos/hotel/" + hotelId).then((res) => {
                setQuartosHotel(res.data);
                setLoading(false);

            }).catch((err) => {
                console.log(err);

            });
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
            {loading ? <ScreenLoader></ScreenLoader> :
                <div className="container mt-4">
                    <div id='mainconteiner'>
                        <div className='Carousel-conteiner col-6'>
                            <Carousel style={{ maxWidth: "700px", maxHeight: "500px" }} >
                                {hotel.imagens.map(Limg =>

                                    <Carousel.Item interval={5000} >
                                        <img
                                            className="d-block w-100"
                                            src={Limg}
                                            alt="img Hotel" />
                                    </Carousel.Item>

                                )}
                            </Carousel>
                        </div>
                        <div id='desc'>
                            <div id='descricao'>


                                <h2>{hotel.nome}</h2>
                                <p>{hotel.descricao}</p>

                                <h5>  {hotel.endereco}</h5>

                                <div id='servicos'>
                                    {hotel.servicos.map(Servico => <h4><Badge bg="info">{Servico}</Badge></h4>)}
                                </div>


                            </div>
                        </div>
                    </div>

                    <div id='table'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Quarto</th>
                                    <th>Serviços</th>
                                    <th>Preço dia</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                {quartoHotel.map(Quarto => 
                                    Quarto.disponivel ?
                                    <tr>
                                        <td>{Quarto.tipo}</td>
                                        <td>{Quarto.servicos.map(serviço => <p>{serviço}</p>)}</td>
                                        <td>{Quarto.preco}</td>
                                        <td><NavLink to={`/hotel/reservar/${hotel._id}/${Quarto._id}`}><button>Reservar</button></NavLink> </td>

                                    </tr> : ""
                                

                                )}

                            </tbody>
                        </Table>
                    </div>
                </div>}
        </>
    );
};
