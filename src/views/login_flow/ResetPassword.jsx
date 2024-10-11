import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleFirebaseError } from "../../firebase/firebaseErrors";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const notify = () =>
    toast.success(
      "O email foi enviado com sucesso! Verifique a caixa de entrada."
    );

  function handleResetPassword(e) {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        notify();
      })
      .catch((error) => {
        setErrorMessage(handleFirebaseError(error));
      });
  }
  return (
    <>
      <section className="backgroundImage">
        <div className="container login-page">
          <ToastContainer />
          <section>
            <NavLink to="/">
              <FaArrowLeft size={20} color="#1c1c1c" />
            </NavLink>
            <br />
            <br />
            <form className="add-form login">
              <div className="form-control">
                <label>Email *</label>
                <br />
                <input
                  onChange={(e) => {
                    setEmail(e.target.value), setErrorMessage("");
                  }}
                  type="text"
                  name="email"
                  placeholder="Ex:. pedro@gmail.com"
                />
                {errorMessage && <p className="error">{errorMessage}</p>}
              </div>

              <button
                onClick={(e) => handleResetPassword(e)}
                className="active btn btn-block"
              >
                Enviar
              </button>
            </form>
          </section>
        </div>
        <div className="backgroundImage"></div>
      </section>
    </>
  );
}
