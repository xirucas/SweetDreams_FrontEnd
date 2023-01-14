import { useForm } from "react-hook-form";
import {  useState } from "react";
import {api} from "../../Shared/api.js";
import { useNavigate } from "react-router";
import "./registro.css";

export const Registro = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    apelido: "",
    email: "",
    password: "",
    data_nascimento: "",
    nif: "",
    genero: "",
    telefone: "",
  });

  const handleChange = (event) => {
    setFormData((user) => ({
      ...user,
      [event.target.name]: event.target.value,
    }));
  };

  const submitForm = (novo_user, event) => {
    event.preventDefault();
    
    setFormData(novo_user);

    const user = {
        nome: formData.nome,
        apelido: formData.apelido,
        email: formData.email,
        password: formData.password,
        data_nascimento: formData.data_nascimento,
        nif: formData.nif,
        genero: formData.genero,
        telefone: formData.telefone
      }

    api.post("utilizadores",user)
    .then((res)=>{
        console.log(res.data)
        navigate("/")
    })
    .catch((err)=>{
        console.log(err)
        
    })
    console.log(user)
  };

  
  


 

  return (
    <>
      <div className="containerForm">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Registar</h3>
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
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...register("password", {
                        required: true,
                        onChange: handleChange,
                        value: formData.password,
                        minLength: {
                          value: 5,
                          message: "minimo de palavras 5",
                        },
                      })}
                    />
                  </div>
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
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone</label>
                    <input
                      type="number"
                      className="form-control"
                      {...register("telefone", {
                        required: true,
                        onChange: handleChange,
                        value: formData.telefone,
                        maxLength: {
                          value: 9,
                        },
                        pattern: /([9][1236])\d{7}/,
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="genero">Genero</label>
                    <select
                      className="form-control"
                      {...register("genero", {
                        required: true,
                        onChange: handleChange,
                        value: formData.genero,
                      })}
                    >
                      <option value="Feminino">Feminino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary botaoForm">
                    Registar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
