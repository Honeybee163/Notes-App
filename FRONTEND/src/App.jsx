import './App.css'
import Home from './pages/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddNote from './pages/AddNote.jsx'
import EditNotes from './pages/EditNotes.jsx'
import DeleteNote from './pages/DeleteNote.jsx'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/add" element={<AddNote />}/>
          <Route path="/edit/:id" element={<EditNotes />}/>
          <Route path="/delete/:id" element={<DeleteNote />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
