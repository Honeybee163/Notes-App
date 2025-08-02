import Note from "../models/Note.js";
import { noteSchema, updateSchema } from "../validations/NoteValidation.js";



//create notes (validate and save)
export function createNotes(req, res) {
  let validation = noteSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json(validation.error.message);
    return;
  }
  let { title, content, tags } = req.body;
  let note = new Note({ title, content, tags });
  note
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}




// Get all notes with optional search and tag filtering
export function getAllNotes(req, res) {
  let { search, tags } = req.query;
  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  if (tags) {
    //convert in array
    const tagArray = tags.split(",");
    query.tags = { $in: tagArray };
  }

  Note.find(query)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
}



//get note by id (validate id also)
export function getNoteById(req, res) {
  let id = req.params.id;
  Note.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}



//update note by id
export function updateNoteById(req, res) {
  let validation = updateSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json(validation.error.message);
    return;
  }
  let id = req.params.id;
  let update = req.body;
  Note.findByIdAndUpdate(id, update)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}




//delete note by id
export function deleteNoteById(req, res) {
  let id = req.params.id;
  Note.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
