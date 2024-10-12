
import { useSelector, useDispatch } from 'react-redux';
import { selectNotes, eraseNote, addNote } from '../store/notesSlice.js';

function Notes({ bookId }) {

  const dispatch = useDispatch();

  function handleEraseNote(id) {
    if (confirm('Tem a certeza de que quer apagar esta nota?')) {
      dispatch(eraseNote(id));
    }
  }

  function handleAddNote(e) {
    e.preventDefault();

    const newNote = {
      book_id: bookId,
      title: document.querySelector('input[name=title]').value,
      text: document.querySelector('textarea[name=note]').value
    }
    if (newNote.title && newNote.text) {
      dispatch(addNote(newNote));
      document.querySelector('input[name=title]').value = "";
      document.querySelector('textarea[name=note]').value = "";
    } else {
      alert('Preencher os campos obrigatórios.');
    }

  }

  const notes = useSelector(selectNotes).filter(note => note.book_id == bookId);

  return (
    <>

      <div className="notes-wrapper">

        <h2>Notas do leitor</h2>

        {notes.length ?

          <div className="notes">
            {notes.map(note =>
              <div key={note.id} className="note">
                <div onClick={() => handleEraseNote(note.id)} className="erase-book" >Apagar nota</div>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </div>
            )}
          </div>

          :

          <p>Este livro ainda não tem notas. Utilize o formulário abaixo para adicionar uma nota.</p>
        }


        <details>
          <summary>Adicionar nota</summary>
          <form className="add-note">
            <div className="form-control noteInput">
              <label>Título *</label>
              <input type="text" name="title" placeholder="Adicione título da nota" />
            </div>
            <div className="form-control noteTextArea">
              <label>Nota *</label>
              <textarea type="text" name="note" placeholder="Adicione nota" />
            </div>

            <button onClick={(e) => { handleAddNote(e) }} className="btn btn-block">Adicionar nota</button>
          </form>
        </details>

      </div>

    </>
  )
}

export default Notes
