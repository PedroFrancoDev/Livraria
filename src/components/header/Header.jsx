import { NavLink } from "react-router-dom";
import "./header.scss";
import { FaPlus } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice.js";
import { startLoading, stopLoading, selectLoading } from "../../store/loadingSlice.js";

function Header({pageTitle}) {
  const dispatch = useDispatch();

    function handleSignup() {
      if(confirm("Você tem certeza de que quer sair da livraria agora?")) {
        signOut(auth).then(() => {
          dispatch(setUser(null));
          
        }).catch((error) => {
          console.log(error);
        });
      }
    }

    return (
      <div className="header">

            <h1>{pageTitle}</h1>

            <div className="header-btns">
                    <NavLink to="/">
                      <button className="btn">
                          Livros
                      </button>
                    </NavLink>

                    <NavLink to="/add-book">
                      <button className="btn">
                          Add Livro <FaPlus size={12} />
                      </button>
                    </NavLink>

                    <button onClick={handleSignup} className="logout">
                      Sair
                    </button>
            </div>
    
      </div>
    )
  }
  
  export default Header
  