// server/routers/notesRoutes.js
const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

// GET /notes/:id - Retrieve a specific note by ID
router.get("/:id", notesController.getNoteById);

// PUT /notes/:id - Update a note
router.put("/:id", notesController.updateNote);

// DELETE /notes/:id - Delete a note
router.delete("/:id", notesController.deleteNote);

// Additional helper routes for testing
// POST /notes - Create a new note
router.post("/", notesController.addNote);

// GET /notes - Get all notes
router.get("/", notesController.getAllNotes);

module.exports = router;
