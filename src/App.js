import "./style/App.css"
import SignInPage from "./components/SignInPage"
import StudentSpaceCalais from "./components/StudentSpaceCalais"
import SignUpPage from "./components/SignUpPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Contacts from "./components/Contacts"
import AddData from "./components/AddData"
import AdminSpace from "./components/AdminSpace.js"
import PostsForEditor from "./components/PostsForEditor"
import EventDetails from "./components/EventDetails"
import NewsDetails from "./components/NewsDetails"
import EditorSpace from "./components/EditorSpace"
import Stage from "./components/Stage"
import AddContact from "./components/addContact"
import ContactsForEditor from "./components/ContactsForEditor"
import Restauration from "./components/RestaurationCalais"
import Sante from "./components/Sante"
import StudentSpaceBoulogne from "./components/StudentSpaceBoulogne"
import StudentSpaceDunkerque from "./components/StudentSpaceDunkerque"
import StudentSpaceSaintOmer from "./components/StudentSpaceSaintOmer"
import AllEvents from "./components/AllEvents"

// Assure-toi d'importer UserProvider
import { UserProvider } from "./components/userContext"
import RestaurationCalais from "./components/RestaurationCalais"
import RestaurationBoulogne from "./components/RestaurationBoulogne"
import RestaurationSaintOmer from "./components/RestaurationSaintOmer"
import RestaurationDunkerque from "./components/RestaurationDunkerque"
import VieEtudiante from "./components/VieEtudiante"

function App() {
  return (
    <UserProvider>
      {" "}
      {/* Ajoute le UserProvider ici pour envelopper l'ensemble des routes */}
      <BrowserRouter>
        <Routes>
          {/* Pages d'authentification */}
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* Espaces étudiants */}
          <Route path="/student-space-calais" element={<StudentSpaceCalais />} />
          <Route path="/student-space-boulogne" element={<StudentSpaceBoulogne />} />
          <Route path="/student-space-dunkerque" element={<StudentSpaceDunkerque />} />
          <Route path="/student-space-saintomer" element={<StudentSpaceSaintOmer />} />

          {/* Route pour tous les événements avec paramètre de site */}
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/all-events/:site" element={<AllEvents />} />

          {/* Autres routes */}
          <Route path="/admin-space" element={<AdminSpace />} />
          <Route path="/editor-space" element={<EditorSpace />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/stage-service" element={<Stage />} />
          <Route path="/vie-etudiante-service" element={<VieEtudiante />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/food-service-calais" element={<RestaurationCalais />} />
          <Route path="/food-service-boulogne" element={<RestaurationBoulogne />} />
          <Route path="/food-service-saintomer" element={<RestaurationSaintOmer />} />
          <Route path="/food-service-dunkerque" element={<RestaurationDunkerque />} />
          <Route path="/sante-service" element={<Sante />} />

          {/* Fonctionnalités de l'espace éditeur */}
          <Route path="/contacts-for-editor" element={<ContactsForEditor />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/addData" element={<AddData />} />
          <Route path="/posts-for-editor" element={<PostsForEditor />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App

