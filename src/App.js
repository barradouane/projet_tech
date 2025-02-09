
import './style/App.css';
import SignInPage from './components/SignInPage';
import StudentSpace from './components/StudentSpace';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contacts from './components/Contacts';
import AddData from './components/AddData';
import AdminSpace from './components/AdminSpace.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* <Route path="/" element={<SignInPage />} /> */}
      <Route path="/" element={<AdminSpace />} />
      <Route path="/student-space" element={<StudentSpace />} />
      <Route path="/sign-up" element={<SignUpPage />}/>
      <Route path="/contacts" element={<Contacts />}/>
      <Route path='/addData' element={<AddData />}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
