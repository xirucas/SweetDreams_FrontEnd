import './contactos.css'


export const Contactos = () => {
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log("eheheheh")
      }

      
   
    return (
        <div>
            <div className="contact-container">

                <div id='form-container'>
                    <h1 className="contact-title">Contato</h1>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nome" className="contact-input" required />
                        <input type="email" placeholder="Email" className="contact-input" required />
                        <textarea placeholder="Mensagem" className="contact-input contact-textarea" required></textarea>
                        <button className="contact-button" type="submit"  >Enviar</button>
                    </form>
                </div>


                <div className="contact-info">
                    
                    <h1 className="contact-title">Contatos</h1>
                    <div>
                    <div className="contact-section">
                        <h2 className="contact-subtitle">Email :</h2>
                        <p className="contact-text">contato@sweatdreams.com</p>
                    </div>
                    <div className="contact-section">
                        <h2 className="contact-subtitle">Telefone :</h2>
                        <p className="contact-text">+55 11 123456789</p>
                    </div>
                    <div className="contact-section">
                        <h2 className="contact-subtitle">Redes Sociais :</h2>
                        <div className="contact-social-links">
                            <a href="#" className="contact-social-link">Facebook</a>
                            <a href="#" className="contact-social-link">Twitter</a>
                            <a href="#" className="contact-social-link">Instagram</a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
