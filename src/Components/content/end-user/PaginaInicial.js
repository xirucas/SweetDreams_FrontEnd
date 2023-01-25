import { api } from "../../../Shared/api";
import { useEffect, useState } from "react";
import { CardHotel } from "./cardHotel";
import { ScreenLoader } from "../../loader/loader";

export const PaginaInicial = () => {
  //pagina com todos os hoteis vindos da base de dados

  const [hoteis, setHoteis] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("hoteis").then((res) => {
      setHoteis(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      {loading ? <ScreenLoader></ScreenLoader> :
        <div className="container">
          <div className="row m-3">
            <div className="col-12">
              <h1 className="text-center">SweetDreams</h1>
              <h2 className="text-center">A sua plataforma de reservas de hotéis</h2>
              <div className="row">
                <div className="col-12">
                  <h3 className="text-center">Aqui tem os hotéis disponiveis para si</h3>
                  <div className="row">
                    <div className="col-12">
                      <div class="container">
                        <div class="row mt-3">
                          {hoteis.map(Hotelj =>
                          Hotelj.disponivel ?(
                            <div className="col-4 mb-4">
                                <CardHotel key={Hotelj.id} hotela={Hotelj}>
                                </CardHotel>

                            </div>):""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
};
