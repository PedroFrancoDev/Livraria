import { NavLink } from 'react-router-dom';
import "./header.scss";
import { FaPlus } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice.js";

function Header({ isModalOpen }) {
  const dispatch = useDispatch();

  function handleSignup() {
    if (confirm("Você tem certeza de que quer sair da livraria agora?")) {
      signOut(auth).then(() => {
        dispatch(setUser(null));

      }).catch((error) => {
        console.log(error);
      });
    }
  }

  function handleOpenModal() {
    isModalOpen(true);
  }

  return (
    <div className="header">

      <h1 className='bookLogo'>📖 Livraria</h1>

      <div className="header-btns">
       
      <button className="btn" onClick={handleOpenModal}>
            Add Livro <FaPlus size={12} />
      </button>
       

        <button onClick={handleSignup} className="logout">
          Sair
        </button>
      </div>

    </div>
  )
}

export default Header
