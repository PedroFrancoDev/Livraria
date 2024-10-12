import { useParams, Link, useNavigate } from 'react-router-dom';
import Notes from '../components/Notes.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectBooks, eraseBook, toggleRead } from '../store/booksSlice.js';
import { eraseBookNotes } from '../store/notesSlice.js';
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
function SingleBookPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifySuccess = () => toast.success("Livro removido com sucesso!",);
  const notifyError = () => toast.error("Erro ao remover o livro à biblioteca. Por favor, tente novamente.",);

  function handleEraseBook(id) {
    if (confirm("Tens a certeza de que queres apagar este livro e todas as notas associadas a ele?")) {
      dispatch(eraseBook(id)).then((response) => {
        if (response.error) {
          notifyError();
        } else {
          notifySuccess();
          navigate("/");
        }
      });
      //dispatch(eraseBookNotes(id));
    }

    console.log(id);
  }

  const { id } = useParams();

  const books = useSelector(selectBooks).books;

  const book = books.filter(book => book.id == id)[0];

  return (
    <section className='single-book-global'>
      <ToastContainer />
      <div className="sigle-book-section">
        <Link to="/">
          <FaArrowLeft size={19} color="#1c1c1c" />
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
                    onClick={() => { dispatch(toggleRead({ id: book.id, isRead: book.isRead })) }}
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
