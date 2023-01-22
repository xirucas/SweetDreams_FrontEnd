import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../../Shared/api";
import { useParams } from "react-router";
import { ScreenLoader } from "../../../loader/loader";
import { ServicosHotel } from "../../../../Shared/servicos";


export const EditarCriarHoteis = () => {

    const servicos = ServicosHotel;

    const params = useParams();

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [isCorrect, setIsCorrect] = useState(true)

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (params.id === undefined) {
            console.log("nao tem id")
            setFormData({
                _id: null,
                nome: "",
                endereco: "",
                descricao: "",
                disponivel: "",
                servicos: []
            })
            setIsLoading(false)
        } else {
            console.log("tem id")
            api.get("hoteis/" + params.id).then((res) => {
                setIsLoading(false)
                setFormData(res.data)
            }).catch(err => {
                setIsLoading(false)
                console.log(err);
            })
        }
    }, [])

    const handleChange = (event) => {
        setFormData((hotelj) => ({
            ...hotelj,
            [event.target.name]: event.target.value,
        }));
    };

    const handleServicos = (event) => {
        if (event.target.checked) {
            setFormData((hotelj) => ({
                ...hotelj,
                servicos: [...hotelj.servicos, event.target.value],
            }));
        } else {
            setFormData((hotelj) => ({
                ...hotelj,
                servicos: hotelj.servicos.filter((servico) => servico !== event.target.value),
            }));
        }
    };


    useEffect(() => {
        register("id", { value: formData._id });
    }, []);


    const submitForm = (hotela, event) => {

        setIsLoading(true);
        event.preventDefault();

        setFormData(hotela);

        const hoteis = {
            nome: formData.nome,
            endereco: formData.endereco,
            descricao: formData.descricao,
            disponivel: formData.disponivel,
            servicos: formData.servicos
        }

        if (formData._id !== null) {
            console.log(hoteis)
            api.patch("hoteis/" + params.id, hoteis)
                .then((res) => {
                    console.log(res.data)
                    navigate("/backoffice/hoteis")
                    setIsLoading(false);
                }
                )
                .catch((err) => {
                    setIsLoading(false);
                    setIsCorrect(false)
                    console.log(err)
                })
        } else {

            api.post("hoteis", hoteis)
                .then((res) => {
                    console.log(res.data)
                    navigate("/backoffice/hoteis")
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setIsCorrect(false)
                    console.log(err)
                })
        }
    }

    return (
        <>
            {isLoading ? <ScreenLoader></ScreenLoader> :
                <div className="containerForm">
                    <h1 className="ms-lg-4 mb-4">{formData._id != null ? `Editar Hotel` : "Criar Hotel"} </h1>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(submitForm)}>
                                        <div className="form-group">
                                            <label htmlFor="nome">Nome</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("nome", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.nome,
                                                })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="endereco">Endereço</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("endereco", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.endereco,
                                                })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="descricao">Descrição</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("descricao", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.descricao,
                                                })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="disponivel">Disponivel</label>
                                            <select
                                                className="form-control"
                                                {...register("disponivel", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.disponivel,
                                                })}
                                            >
                                                <option value="">Selecione</option>
                                                <option value="false">Não</option>
                                                <option value="true">Sim</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="servicos">Serviços</label>
                                            <div className="" style={{display:"flex",flexWrap:"wrap" }}>
                                            {servicos.map((servico, index) => {
                                                return (
                                                    <div key={index} className="form-check" style={{flex:"1 1 33.333%"}}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value={servico}
                                                            id={servico}
                                                            {...register("servicos", {
                                                                onChange: handleServicos,
                                                                value: formData.servicos,
                                                            })}
                                                        />
                                                        <label className="form-check-label" htmlFor={servico}>
                                                            {servico}
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                            </div>
                                        </div>




                                        {!isCorrect ? <h6>Algo correu mal verifique os dados e tente novamente</h6> : ""}
                                        <button type="submit" className="btn btn-primary mt-3">Editar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}