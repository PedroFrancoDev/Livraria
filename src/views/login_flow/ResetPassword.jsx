import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { FaArrowLeft } from "react-icons/fa";

export function ResetPasswordForm() {
    const [email, setEmail] = useState("");
    function handleResetPassword(e) {
        e.preventDefault();
        sendPasswordResetEmail(auth, email);

        alert("O email foi enviado com sucesso! Verifique a caixa de entrada.");
    }
    return <>
        <div className="container login-page">
            <section>
                <Link to="/"><FaArrowLeft size={20} color="#1c1c1c" /></Link>
                <br />
                <br />
                <form className="add-form login">
                    <div className="form-control">
                        <label>Email *</label>
                        <br />
                        <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Ex:. pedro@gmail.com" />
                    </div>

                    <button onClick={(e) => handleResetPassword(e)} className="active btn btn-block">Enviar</button>
                </form>
            </section>
        </div>
    </>
}