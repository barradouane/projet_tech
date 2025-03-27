
import './style/App.css';
import SignInPage from './components/SignInPage';
import StudentSpace from './components/StudentSpace';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contacts from './components/Contacts';
import AddData from './components/AddData';
import AdminSpace from './components/AdminSpace.js';
import PostsForEditor from './components/PostsForEditor';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import News from './components/News';
import NewsDetails from './components/NewsDetails';
import EditorSpace from './components/EditorSpace';
import Stage from './components/Stage';
import Sport from './components/Sport';
import AddContact from './components/addContact';
import ContactsForEditor from './components/ContactsForEditor';
import Restauration from './components/Restauration';
import Sante from './components/Sante';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* Pages d'authentification */}
      <Route path="/" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />}/>
      {/* Différents espaces : étudiant, admistrateur,éditeur */}
      <Route path="/student-space" element={<StudentSpace />} />
      <Route path="/admin-space" element={<AdminSpace />}/>
      <Route path='editor-space' element={<EditorSpace />}/>
      {/* Différents services */}
      <Route path="/" element={<Events />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/" element={<News />}/>
      <Route path='/new/:id' element={<NewsDetails />}/>
      <Route path='/stage-service' element={<Stage />}/>
      <Route path='/sport-service' element={<Sport />}/>
      <Route path="/contacts" element={<Contacts />}/>
      <Route path="/food-service" element={<Restauration />}/>
      <Route path='sante-service' element={<Sante />}/>
      {/* Fonctionnalités de l'espace éditeur */}
      <Route path="/contacts-for-editor" element={<ContactsForEditor />}/>
      <Route path='add-contact' element={<AddContact />}/>
      <Route path='/addData' element={<AddData />}/>
      <Route path='posts-for-editor' element={<PostsForEditor />}/>
      
      </Routes>
      </BrowserRouter>
  );
}

export default App;
