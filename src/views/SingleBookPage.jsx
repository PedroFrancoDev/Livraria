import { useParams, Link, useNavigate } from 'react-router-dom';
import Notes from '../components/Notes.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectBooks, eraseBook, toggleRead } from '../store/booksSlice.js';
import { eraseBookNotes } from '../store/notesSlice.js';
import { FaArrowLeft } from "react-icons/fa";

function SingleBookPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEraseBook(id) {
    if (confirm("Tens a certeza de que queres apagar este livro e todas as notas associadas a ele?")) {
      dispatch(eraseBook(id));
      dispatch(eraseBookNotes(id));
      navigate("/");
    }
  }

  const { id } = useParams();

  const books = useSelector(selectBooks);

  const book = books.filter(book => book.id == id)[0];

  return (
    <section className='single-book-global'>
      <div className="sigle-book-section">
        <Link to="/">
          <button className="btn">
            <FaArrowLeft size={19} color="#1c1c1c" /> Voltar aos livros
          </button>
        </Link>

        {book ?

          <div>
            <div className="single-book">
              <div className="book-cover">
                <img src={book.cover} />
              </div>

              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">{book.author}</h4>
                <p>{book.synopsis}</p>
                <div className="read-checkbox">
                  <input
                    onClick={() => { dispatch(toggleRead(book.id)) }}
                    type="checkbox"
                    defaultChecked={book.isRead} />
                  <label>{book.isRead ? "Já o li" : "Ainda não o li"}</label>
                </div>
                <div onClick={() => handleEraseBook(book.id)} className="erase-book">
                  Apagar livro
                </div>
              </div>
            </div>

            <Notes bookId={id} />
          </div>

          :

          <div>
            <p>Livro não encontrado. Clique no botão acima para voltar à lista de livros.</p>
          </div>

        }
      </div>


    </section>
  )
}

export default SingleBookPage
