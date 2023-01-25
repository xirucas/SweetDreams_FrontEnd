import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const Contactos = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (data) => {
        setIsSubmitted(true);
    };

    return (
        <>
            <div className="container mt-2">
                    <h1>Contactos</h1>
                    <p>Se tiver alguma dúvida ou sugestão, não hesite em contactar-nos.</p>
                    <div className="containerForm">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="nome">Nome</label>
                                <input type="text" className="form-control" id="nome" placeholder="Nome" {...register("nome", { required: true })} />
                                {errors.nome && <span className="error">Este campo é obrigatório</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" {...register("email", { required: true })} />
                                {errors.email && <span className="error">Este campo é obrigatório</span>}
                            </div>
                            <div className="form-group">

                                <label htmlFor="mensagem">Mensagem</label>
                                <textarea className="form-control" id="mensagem" rows="3" {...register("mensagem", { required: true })}></textarea>
                                {errors.mensagem && <span className="error">Este campo é obrigatório</span>}
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" style={{height:"42px", width:"90px"}}>Enviar</button>
                        </form>
                    </div>
            </div>
        </>


    )
}
