// server/controllers/notesController.js

// In-memory storage for notes
let notes = [];
let nextId = 1;

// GET /notes/:id - Retrieve a specific note by ID
exports.getNoteById = (req, res) => {
  try {
    const { id } = req.params;
    const noteId = parseInt(id);

    const note = notes.find((n) => n.id === noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    console.log(`Retrieved note with ID ${noteId}:`, note);
    res.status(200).json(note);
  } catch (error) {
    console.error("Error retrieving note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT /notes/:id - Update a note
exports.updateNote = (req, res) => {
  try {
    const { id } = req.params;
    const noteId = parseInt(id);
    const { title, content } = req.body;

    const noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Update the note
    if (title !== undefined) notes[noteIndex].title = title;
    if (content !== undefined) notes[noteIndex].content = content;
    notes[noteIndex].updatedAt = new Date().toISOString();

    console.log(`Updated note with ID ${noteId}:`, notes[noteIndex]);
    res.status(200).json({
      message: "Note updated successfully",
      note: notes[noteIndex],
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE /notes/:id - Delete a note
exports.deleteNote = (req, res) => {
  try {
    const { id } = req.params;
    const noteId = parseInt(id);

    const noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    const deletedNote = notes.splice(noteIndex, 1)[0];
    console.log(`Deleted note with ID ${noteId}:`, deletedNote);
    res.status(200).json({
      message: "Note deleted successfully",
      note: deletedNote,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper function to add a note (for testing purposes)
exports.addNote = (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newNote = {
      id: nextId++,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notes.push(newNote);
    console.log("Created new note:", newNote);
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper function to get all notes (for testing purposes)
exports.getAllNotes = (req, res) => {
  try {
    console.log("All notes:", notes);
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
