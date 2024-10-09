import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from './views/books/BooksPage.jsx';
import SingleBookPage from './views/SingleBookPage.jsx';
import LoginPage from './views/login_flow/LoginPage.jsx';
import AddBookPage from './views/books/BooksPage.jsx';
import { ResetPasswordForm } from './views/login_flow/ResetPassword.jsx';
import { selectUser } from "./store/usersSlice.js";
import { useSelector } from "react-redux";

function App() {

  const user = useSelector(selectUser);
  return (
    <BrowserRouter>
      <>
        <Routes>
          {user.currentUser ? (
            <>
              <Route index element={<BooksPage />} />
              <Route path="add-book" element={<AddBookPage />} />
              <Route path="book/:id" element={<SingleBookPage />} />
            </>
          ) : (
            <>
              <Route index path="/" element={<LoginPage />} />
              <Route path="resetPassword/:id" element={<ResetPasswordForm />} />
            </>
          )}
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
