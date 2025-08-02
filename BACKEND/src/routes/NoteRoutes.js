import express from "express";
import {createNotes,getAllNotes,getNoteById,updateNoteById,deleteNoteById} from "../controllers/NoteController.js";
import CheckId from "../middlewares/CheckId.js";
let router=express.Router();


//create a new note
router.post('/api/notes',createNotes)

//get all notes
router.get('/api/notes',getAllNotes)

//get note by id
router.get('/api/notes/:id',CheckId,getNoteById)

//update note by id
router.put('/api/notes/:id',CheckId,updateNoteById) 

//delete note by id
router.delete('/api/notes/:id',CheckId,deleteNoteById)


export default router;