import FullPageLoader from '../../components/FullPageLoader.jsx';
import { useState, useEffect } from 'react';
import { auth } from "../../firebase/config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/usersSlice.js";
import { startLoading, stopLoading, selectLoading } from "../../store/loadingSlice.js";

function LoginPage() {
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(startLoading());

    const handleLoad = () => dispatch(stopLoading());

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, [dispatch]);

  onAuthStateChanged(auth,(user) => {
    if(user) {
      dispatch(setUser({ id: user.uid, email: user.email }),);
    } else {
      dispatch(null);
    }
  });

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
    ).catch((error) => {
      setErrorMessage(error.message);
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
      setErrorMessage(error.message)
      dispatch(stopLoading());
    })
  }

  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}

     <section className='globalContainer'>
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

            {
              loginType == 'login' ?
                <button onClick={(e) => handleLogin(e)} className="active btn btn-block">Entrar</button>
                :
                <button onClick={(e) => handleSignup(e)} className="active btn btn-block">Registrar</button>
            }
            {errorMessage && <p className='error'>{errorMessage}</p>}

            <NavLink to="resetPassword/:id" className="forgot-password">Esqueceu a senha?</NavLink>
          </form>
        </section>
      </div>
   
     </section>
    </>
  )
}

export default LoginPage
