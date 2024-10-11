import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBook } from '../store/booksSlice.js';

function AddBookPage({ handleCloseModal, notifySuccess, notifyError }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    function handleAddBook(e) {
        e.preventDefault();

        const newBook = {
            title: document.querySelector('input[name=title]').value,
            cover: document.querySelector('input[name=cover]').value,
            isRead: false,
            author: document.querySelector('input[name=author]').value,
            synopsis: document.querySelector('textarea[name=synopsis]').value
        }

        if (newBook.title && newBook.cover && newBook.author) {
            dispatch(addBook(newBook)).then((response) => {
                console.log(response);
                if(response.error) {
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

                <button onClick={(e) => handleAddBook(e)} className="btn btn-block">Salvar livro</button>
            </form>
        </>
    )
}

export default AddBookPage
