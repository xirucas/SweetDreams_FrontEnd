import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../../Shared/api";
import { useParams } from "react-router";
import { ScreenLoader } from "../../../loader/loader";
import { ServicosQuartos } from "../../../../Shared/servicos";

export const EditarCriarQuartos = () => {

    const servicos = ServicosQuartos;

    const params = useParams();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [isCorrect, setIsCorrect] = useState(true)

    const [formData, setFormData] = useState({});

    const [hoteis, setHoteis] = useState([]);


    useEffect(() => {
        api.get("hoteis").then((res) => {
            setHoteis(res.data)
        }).catch(err => {
            console.log(err);
        })
        if (params.id === undefined) {
            console.log("nao tem id")
            setFormData({
                _id: null,
                hotel_id: null,
                andar: "",
                numero_quarto: null,
                tipo: "",
                preco: "",
                descricao: "",
                disponivel: null,
                servicos: [],
            })
            setIsLoading(false)
        } else {
            console.log("tem id")
            api.get("quartos/" + params.id).then((res) => {
                setIsLoading(false)
                setFormData(res.data)
            }).catch(err => {
                setIsLoading(false)
                console.log(err);
            })
        }
    }, [])

    const handleChange = (event) => {
        setFormData((quartosj) => ({
            ...quartosj,
            [event.target.name]: event.target.value,
        }));
    };

    const handleServicos = (event) => {
        if (event.target.checked) {
            setFormData((quartosj) => ({
                ...quartosj,
                servicos: [...quartosj.servicos, event.target.value],
            }));
        } else {
            setFormData((quartosj) => ({
                ...quartosj,
                servicos: quartosj.servicos.filter((servico) => servico !== event.target.value),
            }));
        }
    };

    useEffect(() => {
        register("id", { value: formData._id });
    }, []);


    const submitForm = (quartosa, event) => {

        setIsLoading(true);
        event.preventDefault();

        setFormData(quartosa);



        const quartos = {
            hotel_id: formData.hotel_id,
            andar: formData.andar,
            numero_quarto: formData.numero_quarto,
            tipo: formData.tipo,
            preco: formData.preco,
            descricao: formData.descricao,
            disponivel: formData.disponivel,
            servicos: formData.servicos,

        }

        if (formData._id !== null) {
            console.log(quartos)
            api.patch("quartos/" + params.id, quartos)
                .then((res) => {
                    console.log(res.data)
                    navigate("/backoffice/quartos")
                    setIsLoading(false);
                }
                )
                .catch((err) => {
                    setIsLoading(false);
                    setIsCorrect(false)
                    console.log(err)
                })
        } else {

            api.post("quartos", quartos)
                .then((res) => {
                    console.log(res.data)
                    navigate("/backoffice/quartos")
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
            {isLoading ? <ScreenLoader /> :
                <div className="containerForm">
                    <h1 className="ms-lg-4 mb-4">{formData._id != null ? `Editar Quarto` : "Criar Quarto"} </h1>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(submitForm)}>
                                        <div className="form-group">
                                            <label htmlFor="hotel_id">Hotel</label>
                                            <select
                                                className="form-control"
                                                {...register("hotel_id", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.hotel_id,
                                                })}
                                            >
                                                <option value="">Selecione um hotel</option>
                                                {hoteis.map((hotel) => {
                                                    return (
                                                        <option value={hotel._id}>{hotel.nome}</option>
                                                    )
                                                }
                                                )}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="andar">Andar</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register("andar", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.andar,
                                                })}
                                            />
                                            {errors.andar && <span className="text-danger">Este campo é obrigatório</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numero_quarto">Número do Quarto</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register("numero_quarto", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.numero_quarto,
                                                })}
                                            />
                                            {errors.numero_quarto && <span className="text-danger">Este campo é obrigatório</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tipo">Tipo</label>
                                            <select
                                                className="form-control"
                                                {...register("tipo", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.tipo,
                                                })}
                                            >
                                                <option value="">Selecione</option>
                                                <option value="Quarto individual">Quarto individual</option>
                                                <option value="Quarto duplo">Quarto duplo</option>
                                                <option value="Quarto de casal">Quarto de casal</option>
                                                <option value="Quarto Triplo">Quarto Triplo</option>
                                                <option value="Quarto quádruplo ">Quarto quádruplo </option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="preco">Preço</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register("preco", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.preco,
                                                })}
                                            />
                                            {errors.preco && <span className="text-danger">Este campo é obrigatório</span>}
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
                                            {errors.descricao && <span className="text-danger">Este campo é obrigatório</span>}
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="disponivel">Disponível</label>
                                            <select
                                                className="form-control"
                                                {...register("disponivel", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.disponivel,
                                                })}
                                            >
                                                <option value="">Selecione uma opção</option>
                                                <option value="true">Sim</option>
                                                <option value="false">Não</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="servicos">Serviços</label>
                                            <div className="" style={{ display: "flex", flexWrap: "wrap" }}>
                                                {servicos.map((servico, index) => {
                                                    return (
                                                        <div key={index} className="form-check " style={{ flex: "1 1 33.333%" }}>
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
                                        <div className="form-group">
                                            {!isCorrect ? <h6>Algo correu mal verifique os dados e tente novamente</h6> : ""}
                                            <button type="submit" className="btn btn-primary">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )

}