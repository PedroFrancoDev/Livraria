import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import { auth } from "../firebase/config.js";


function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});

  function handlerCredentials(e) {
    setUserCredentials({...userCredentials, [e.target.name] : e.target.valeu});
  }
  
    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the Book App</h1>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input onChange={(e) => setUserCredentials(e)} type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input onChange={(e) => setUserCredentials(e)} type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={() => handlerCredentials()} className="active btn btn-block">Login</button>
                    : 
                    <button className="active btn btn-block">Sign Up</button>
                  }

                  <p className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  