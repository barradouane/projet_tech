import "./style/App.css"

// Composants de pages
import SignInPage from "./components/SignInPage"
import SignUpPage from "./components/SignUpPage"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"

// Espaces étudiants
import StudentSpaceCalais from "./components/StudentSpaceCalais"
import StudentSpaceBoulogne from "./components/StudentSpaceBoulogne"
import StudentSpaceDunkerque from "./components/StudentSpaceDunkerque"
import StudentSpaceSaintOmer from "./components/StudentSpaceSaintOmer"

// Services et informations
import Contacts from "./components/Contacts"
import Sante from "./components/Sante"
import VieEtudiante from "./components/VieEtudiante"
import FinancerSesEtudes from "./components/FinancerSesEtudes"
import Stage from "./components/Stage"
import AllEvents from "./components/AllEvents"
import EventDetails from "./components/EventDetails"
import NewsDetails from "./components/NewsDetails"

// Restauration
import RestaurationCalais from "./components/RestaurationCalais"
import RestaurationBoulogne from "./components/RestaurationBoulogne"
import RestaurationSaintOmer from "./components/RestaurationSaintOmer"
import RestaurationDunkerque from "./components/RestaurationDunkerque"

// Espace Éditeur
import EditorSpace from "./components/EditorSpace"
import PostsForEditor from "./components/PostsForEditor"
import ContactsForEditor from "./components/ContactsForEditor"
import AddContact from "./components/addContact"
import AddData from "./components/AddData"

// Espace Admin
import AdminSpace from "./components/AdminSpace"
import StudentsForAdmin from "./components/StudentsForAdmin"
import ModifierPost from "./components/ModifierPost"
import AddStudent from "./components/addStudent"

// Contexte utilisateur
import { UserProvider } from "./components/userContext"

// Routing
import { HashRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          {/* Authentification */}
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Espaces étudiants */}
          <Route path="/student-space-calais" element={<StudentSpaceCalais />} />
          <Route path="/student-space-boulogne" element={<StudentSpaceBoulogne />} />
          <Route path="/student-space-dunkerque" element={<StudentSpaceDunkerque />} />
          <Route path="/student-space-saintomer" element={<StudentSpaceSaintOmer />} />

          {/* Événements */}
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/all-events/:site" element={<AllEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/news/:id" element={<NewsDetails />} />

          {/* Espaces Admin et Éditeur */}
          <Route path="/admin-space" element={<AdminSpace />} />
          <Route path="/editor-space" element={<EditorSpace />} />
          <Route path="/posts-for-editor" element={<PostsForEditor />} />
          <Route path="/contacts-for-editor" element={<ContactsForEditor />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/addData" element={<AddData />} />
          <Route path="/students-for-admin" element={<StudentsForAdmin />} />
          <Route path="/modifier_post/:id" element={<ModifierPost />} />
          <Route path="/add-student" element={<AddStudent />} />

          {/* Services étudiants */}
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/stage-service" element={<Stage />} />
          <Route path="/vie-etudiante-service" element={<VieEtudiante />} />
          <Route path="/sante-service" element={<Sante />} />
          <Route path="/financement-service" element={<FinancerSesEtudes />} />

          {/* Services de restauration */}
          <Route path="/food-service-calais" element={<RestaurationCalais />} />
          <Route path="/food-service-boulogne" element={<RestaurationBoulogne />} />
          <Route path="/food-service-saintomer" element={<RestaurationSaintOmer />} />
          <Route path="/food-service-dunkerque" element={<RestaurationDunkerque />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  )
}

export default App
