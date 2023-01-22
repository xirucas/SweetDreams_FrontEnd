import { useForm } from "react-hook-form";
import { useState } from "react";
import { Autenticacao } from "../autenticacao/autenticacao.js";
import { useNavigate } from "react-router";
import { ScreenLoader } from "../loader/loader.js";

export const LoginUser = () => {
  const { Login } = Autenticacao();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [isCorrect,setIsCorrect]=useState(true)

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((user) => ({
      ...user,
      [event.target.name]: event.target.value,
    }));
  };

  const submitForm = async (cardenciais, event) => {
    event.preventDefault();
    setFormData(cardenciais);
    setIsLoading(true);
    await Login(formData.email, formData.password).then(()=>{
      navigate("/");
      window.location.reload(false)
      setIsLoading(false);
    }).catch(()=>{
      setIsCorrect(false)
      setIsLoading(false);
    })
    
  };

  return (
    <>
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <div className="containerForm">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Login</h3>
                  <form onSubmit={handleSubmit(submitForm)}>
                    <div className="form-group">
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
                          })}
                        />
                      </div>
                    </div>
                    {!isCorrect?<h6>Email ou password incorreta</h6>:""} 
                    <button type="submit" className="btn btn-primary mt-3">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
