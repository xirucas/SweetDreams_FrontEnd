import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../Shared/api";
import { ScreenLoader } from "../../loader/loader";

export const EditarPerfil = (props) => {
    const user = props.user;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [isCorrect, setIsCorrect] = useState(true)

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (user) {
            api.get("utilizadores/" + user._id).then((res)=>{
                setFormData(res.data)
                setIsLoading(false)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }, [])

    const handleChange = (event) => {
        setFormData((userj) => ({
            ...userj,
            [event.target.name]: event.target.value,
        }));
    };

    useEffect(() => {
        register("id", { value: formData._id });
    }, []);

    const submitForm = (usera, event) => {

        setIsLoading(true);
        event.preventDefault();

        setFormData(usera);

        const usere = {
            nome: formData.nome,
            apelido: formData.apelido,
            email: formData.email,
            data_nascimento: formData.data_nascimento,
            nif: formData.nif,
            genero: formData.genero,
            telefone: formData.telefone,
        }

            console.log(usere)
            api.patch("utilizadores/" + user._id, usere)
                .then((res) => {
                    console.log(res.data)
                    navigate("/perfil")
                    setIsLoading(false);
                }
                )
                .catch((err) => {
                    setIsLoading(false);
                    setIsCorrect(false)
                    console.log(err)
                })
        

    }

    return (
        <>
            {isLoading ? <ScreenLoader></ScreenLoader> : <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Editar Perfil</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className="row">
                                <div className="col-12 col-md-6">
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
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="apelido">Apelido</label>
                                        <input
                                                type="text"
                                                className="form-control"
                                                {...register("apelido", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.apelido,
                                                })}
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input

                                                type="email"
                                                className="form-control"
                                                {...register("email", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.email,
                                                })}
                                            />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="data_nascimento">Data de Nascimento</label>
                                        <input
                                                type="date"
                                                className="form-control"
                                                {...register("data_nascimento", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.data_nascimento,
                                                })}
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="nif">NIF</label>
                                        <input
                                                type="number"
                                                className="form-control"
                                                {...register("nif", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.nif,
                                                })}
                                            />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="genero">Género</label>
                                        <select
                                                className="form-control"
                                                {...register("genero", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.genero,
                                                })}
                                            >
                                                <option value="Masculino">Masculino</option>
                                                <option value="Feminino">Feminino</option>
                                                <option value="Outro">Outro</option>
                                            </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="telefone">Telefone</label>
                                        <input
                                                type="number"
                                                className="form-control"
                                                {...register("telefone", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.telefone,
                                                })}
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary">Editar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    )
}

    