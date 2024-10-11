import FullPageLoader from '../../components/FullPageLoader.jsx';
import { useState, useEffect } from 'react';
import { auth } from "../../firebase/config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/usersSlice.js";
import { startLoading, stopLoading, selectLoading } from "../../store/loadingSlice.js";
import { handleFirebaseError } from "../../firebase/firebaseErrors";

function LoginPage() {
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);


  useEffect(() => {
    dispatch(startLoading());
    const timer = setTimeout(() => {
      dispatch(stopLoading());
    }, 1000);
    return () => {
      clearTimeout(timer);
      dispatch(stopLoading());
    };
  }, [dispatch]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }),);
    } else {
      dispatch(null);
    }
  });

  function handleCredentials(e) {
    setErrorMessage("");
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();
    setErrorMessage("");

    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    ).catch((error) => {
      setErrorMessage(handleFirebaseError(error));
    })

  }

  function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");

    dispatch(startLoading());
    signInWithEmailAndPassword(auth, userCredentials
      .email,
      userCredentials.password
    ).catch((error) => {
      setErrorMessage(handleFirebaseError(error));
      dispatch(stopLoading());
    })
  }

  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}
      <section className='globalContainer'>
        <div className="container login-page">
          <section>
            <h1>Bem-vindo à Livraria</h1>
            <p>Iniciar sessão ou criar uma conta para continuar</p>
            <div className="login-type">
              <button
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={() => setLoginType('login')}>
                Entrar
              </button>
              <button
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={() => setLoginType('signup')}>
                Registrar
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

              <div className='btn-section'>
                {
                  loginType == 'login' ?
                    <button onClick={(e) => handleLogin(e)} className="active btn btn-block">Entrar</button>
                    :
                    <button onClick={(e) => handleSignup(e)} className="active btn btn-block">Registrar</button>
                }
                {errorMessage && <p className='error'>{errorMessage}</p>}
              </div>

              <div className='resetConteinar'>
              <NavLink to="resetPassword/:id" className="forgot-password">Esqueceu a senha?</NavLink>
              </div>
            </form>
          </section>
        </div>
        <div className='backgroundImage'>
        </div>
      </section>
    </>
  )
}

export default LoginPage
