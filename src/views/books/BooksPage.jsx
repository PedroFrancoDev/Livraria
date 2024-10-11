import Book from '../../components/Book.jsx';
import Header from '../../components/header/Header.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectBooks } from '../../store/booksSlice.js';
import "./books.scss";
import Modal from "react-modal";
import { useState, useEffect } from 'react';
import AddBookPage from "../AddBookPage.jsx";
import { FaTimes } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify";
import { fetchBooks } from '../../store/booksSlice.js';

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    backgroundColor: "#f1f1f1",
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(1px)',
    zIndex: 999,
    padding: 40,
  },
};

function BooksPage() {
  const books = useSelector(selectBooks).books;
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notifySuccess = () => toast.success("Livro adicionado com sucesso!",);
  const notifyError = () => toast.error("Erro ao adicionar o livro à biblioteca. Por favor, tente novamente.",);

  const bookStatus = useSelector(selectBooks).status;

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (bookStatus == "idle") {
      dispatch(fetchBooks());
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Modal isOpen={isModalOpen} style={customStyles}>
        <button onClick={handleCloseModal} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}>
          <FaTimes size={20} color="#1c1c1c" />
        </button>

        <AddBookPage handleCloseModal={handleCloseModal} notifySuccess={notifySuccess} notifyError={notifyError} />
      </Modal>
      <div className="booksContiner">
        <Header isModalOpen={setIsModalOpen} />
        <div className="books-container">
          <div className="books-list">

            {bookStatus === "loading" ? <p>carregando...</p> : books.length == 0 ? <p>Lista vázia.</p> : books.map(book =>
              <Book key={book.id} book={book} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BooksPage
