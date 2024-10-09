import Book from '../../components/Book.jsx';
import Header from '../../components/header/Header.jsx';
import {useSelector} from 'react-redux';
import {selectBooks} from '../../store/booksSlice.js';
import "./books.scss";

function BooksPage() {
  const books = useSelector(selectBooks);
  const pageTitle = "📖 Livraria";
    
    return (
      <>
        <div className="booksContiner">
            <Header pageTitle={pageTitle} />
            <div className="books-container">
                <div className="books-list">
                    
                    {books.map(book => 
                    
                    <Book key={book.id} book={book}  />
                    
                    )}

                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default BooksPage
  