import { useNavigate } from 'react-router-dom';
import { addBook } from '../store/booksSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectBooks } from '../store/booksSlice.js';
import ClipLoader from "react-spinners/ClipLoader";

function AddBookPage({ handleCloseModal, notifySuccess, notifyError }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addBookStatus = useSelector(selectBooks).status;

    function handleAddBook(e) {
        e.preventDefault();
        const newBook = {
            title: document.querySelector('input[name=title]').value,
            cover: isValidImageUrl(document.querySelector('input[name=cover]').value) ? document.querySelector('input[name=cover]').value : "https://st2.depositphotos.com/25867432/47156/v/1600/depositphotos_471568420-stock-illustration-promo-flyers-bookstore-bookshop-library.jpg",
            isRead: false,
            author: document.querySelector('input[name=author]').value,
            synopsis: document.querySelector('textarea[name=synopsis]').value
        }

        if (newBook.title && newBook.cover && newBook.author) {
            dispatch(addBook(newBook)).then((response) => {
                console.log(response);
                if (response.error) {
                    notifyError();
                } else {
                    notifySuccess();
                    handleCloseModal();
                }
            },);
        } else {
            notifyError();
        }
    }

    const isValidImageUrl = (url) => {
        return (/\.(jpeg|jpg|gif|png|bmp|webp)$/i).test(url);
    };

    return (
        <>
            <form className="add-form">
                <div className="form-control">
                    <label>Título *</label>
                    <input type="text" name="title" placeholder="Add título do livro" />
                </div>
                <div className="form-control">
                    <label>Capa do livro *</label>
                    <input type="text" name="cover" placeholder="Add capa do Livro" />
                </div>

                <div className="form-control">
                    <label>Autor *</label>
                    <input
                        type="text" name="author" placeholder="Nome do autor" />
                </div>

                <div className="form-control">
                    <label>Synopsis</label>
                    <textarea
                        type="text" name="synopsis" placeholder="Adicionar uma sinopse..." />
                </div>

                <button style={{ backgroundColor: addBookStatus === "loading" ? "gray" : "", }}
                    className="btn-block" disabled={addBookStatus == "loading"} onClick={(e) => handleAddBook(e)} className="btn-block">{addBookStatus == "loading" ? "Salvando..." : "Salvar livro"}</button>
            </form>
        </>
    )
}

export default AddBookPage
