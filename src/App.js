import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignInPage from './components/SignInPage';
import StudentSpace from './components/StudentSpace';
import SignUpPage from './components/SignUpPage';
import Contacts from './components/Contacts';
import AddData from './components/AddData';
import AdminSpace from './components/AdminSpace';
import PostsForAdmin from './components/PostsForAdmin';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import News from './components/News';
import NewsDetails from './components/NewsDetails';
import PasswordReset from './components/PasswordReset';
import Ultra from './components/Ultra';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/forgot-password" element={<PasswordReset />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/student-space" element={<StudentSpace />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/addData" element={<AddData />} />
        <Route path="/posts_for_admin" element={<PostsForAdmin />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/new/:id" element={<NewsDetails />} />
        <Route path="/Ultra" element={<Ultra />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
