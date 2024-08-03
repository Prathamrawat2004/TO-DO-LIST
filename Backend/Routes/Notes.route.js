import express from "express";
const router = express.Router();

// collection import
import note from "../models/Notes.js";

// Adding a note
router.post('/add', async (req, res) => {
    try {
        const { title, desc } = req.body;
        const newNote = new note({
            title: title,
            desc: desc
        });

        // saving in database
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add note' });

    }
});

// getting all notes
router.get('/', async (req, res) => {
    try {
        const notes = await note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve notes' });

    }
});

// updating a note
router.put('/update/:id', async (req, res) => {
    try {
        const { title, desc } = req.body;
        const id = req.params.id;
        const updatedNote = await note.findByIdAndUpdate(id, { title, desc }, { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
});

// deleting a note
router.delete('/delete/:id', async (req, res) => {
    try {
        await note.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete note' });
    }
});


export default router;