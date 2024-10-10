import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from './views/books/BooksPage.jsx';
import SingleBookPage from './views/SingleBookPage.jsx';
import LoginPage from './views/login_flow/LoginPage.jsx';
import AddBookPage from './views/AddBookPage.jsx';
import { ResetPasswordForm } from './views/login_flow/ResetPassword.jsx';
import { selectUser } from "./store/usersSlice.js";
import { useSelector } from "react-redux";

function App() {

  const user = useSelector(selectUser);
  return (
    <>
      <BrowserRouter >
      <>
        <Routes>
          {user.currentUser ? (
            <>
              <Route path='/' element={<BooksPage />} />
              <Route path="addBook" element={<AddBookPage />} />
              <Route path="book/:id" element={<SingleBookPage />} />
            </>
          ) : (
            <>
              <Route path='/' element={<LoginPage />} />
              <Route path="resetPassword/:id" element={<ResetPasswordForm />} />
            </>
          )}
        </Routes>
      </>
    </BrowserRouter>
    </>
  )
}

export default App
