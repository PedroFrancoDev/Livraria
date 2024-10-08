import FullPageLoader from '../../components/FullPageLoader.jsx';
import { useState } from 'react';
import { auth } from "../../firebase/config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice.js";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();
    setErrorMessage("");

    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    ).then((userCredential) => {
      console.log(userCredential.user);
      dispatch(setUser({ id: userCredential.user.uid, email: userCredential.user.email }));
    }).catch((error) => {
      setErrorMessage(error.message);
    })
  }

  function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");

    signInWithEmailAndPassword(auth, userCredentials
      .email,
      userCredentials.password
    ).then((userCredential) => {
      console.log(userCredential.user);
      dispatch(setUser({ id: userCredential.user.uid, email: userCredential.user.email }));
    }).catch((error) => {
      setErrorMessage(error.message)
    })
  }

  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}

      <div className="container login-page">
        <section>
          <h1>Welcome to the Book App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == 'login' ? 'selected' : ''}`}
              onClick={() => setLoginType('login')}>
              Entrar
            </button>
            <button
              className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
              onClick={() => setLoginType('signup')}>
              Registar
            </button>
          </div>
          <form className="add-form login">
            <div className="form-control">
              <label>Email *</label>
              <input onChange={(e) => handleCredentials(e)} type="text" name="email" placeholder="Ex:. pedro@gmail.com" />
            </div>
            <div className="form-control">
              <label>Senha *</label>
              <input onChange={(e) => handleCredentials(e)} type="password" name="password" placeholder="Digite sua senha" />
            </div>

            {
              loginType == 'login' ?
                <button onClick={(e) => handleLogin(e)} className="active btn btn-block">Entrar</button>
                :
                <button onClick={(e) => handleSignup(e)} className="active btn btn-block">Registar</button>
            }
            {errorMessage && <p className='error'>{errorMessage}</p>}

            <Link to="resetPassword/:id" className="forgot-password">Esqueceu a senha?</Link>
          </form>
        </section>
      </div>
    </>
  )
}

export default LoginPage
