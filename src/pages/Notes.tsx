import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteFormData {
  title: string;
  content: string;
}

interface NoteIdFormData {
  noteId: string;
}

const API_BASE_URL = "http://localhost:3001/api/notes";

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form for creating notes
  const createNoteForm = useForm<NoteFormData>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Form for updating notes
  const updateNoteForm = useForm<NoteFormData>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Form for note ID operations
  const noteIdForm = useForm<NoteIdFormData>({
    defaultValues: {
      noteId: "",
    },
  });

  // Fetch all notes on component mount
  useEffect(() => {
    fetchAllNotes();
  }, []);

  const fetchAllNotes = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setNotes(data);
      console.log("All notes:", data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      showMessage("error", "Failed to fetch notes");
    }
  };

  const fetchNoteById = async (data: NoteIdFormData) => {
    const noteId = data.noteId;
    if (!noteId) {
      showMessage("error", "Please enter a note ID");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${noteId}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Note not found");
      }
      const noteData = await response.json();
      setSelectedNote(noteData);
      // Only update the update form, not the create form
      updateNoteForm.reset({
        title: noteData.title,
        content: noteData.content,
      });
      console.log("Retrieved note:", noteData);
      showMessage("success", `Note ${noteId} retrieved successfully`);
    } catch (error: any) {
      console.error("Error fetching note:", error);
      showMessage("error", error.message || "Failed to fetch note");
      setSelectedNote(null);
    }
  };

  const createNote = async (data: NoteFormData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create note");
      }

      const createdNote = await response.json();
      console.log("Created note:", createdNote);
      showMessage("success", "Note created successfully");
      // Clear only the create form
      createNoteForm.reset({
        title: "",
        content: "",
      });
      fetchAllNotes();
    } catch (error: any) {
      console.error("Error creating note:", error);
      showMessage("error", error.message || "Failed to create note");
    }
  };

  const updateNote = async (data: NoteFormData) => {
    const noteId = noteIdForm.getValues("noteId");
    if (!noteId) {
      showMessage("error", "Please enter a note ID");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update note");
      }

      const result = await response.json();
      console.log("Updated note:", result);
      showMessage("success", `Note ${noteId} updated successfully`);
      setSelectedNote(result.note);
      // Update the update form with the new data
      updateNoteForm.reset({
        title: result.note.title,
        content: result.note.content,
      });
      fetchAllNotes();
    } catch (error: any) {
      console.error("Error updating note:", error);
      showMessage("error", error.message || "Failed to update note");
    }
  };

  const deleteNote = async () => {
    const noteId = noteIdForm.getValues("noteId");
    if (!noteId) {
      showMessage("error", "Please enter a note ID");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${noteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete note");
      }

      const data = await response.json();
      console.log("Deleted note:", data);
      showMessage("success", `Note ${noteId} deleted successfully`);
      noteIdForm.reset();
      updateNoteForm.reset({
        title: "",
        content: "",
      });
      setSelectedNote(null);
      fetchAllNotes();
    } catch (error: any) {
      console.error("Error deleting note:", error);
      showMessage("error", error.message || "Failed to delete note");
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-6">Notes API Testing</h1>

      {message && (
        <Alert className={`mb-4 ${message.type === "error" ? "border-red-500" : "border-green-500"}`}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Create Note */}
        <Card>
          <CardHeader>
            <CardTitle>Create Note</CardTitle>
            <CardDescription>Add a new note to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...createNoteForm}>
              <form onSubmit={createNoteForm.handleSubmit(createNote)} className="space-y-4">
                <FormField
                  control={createNoteForm.control}
                  name="title"
                  rules={{ required: "Title is required", minLength: { value: 1, message: "Title cannot be empty" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter note title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createNoteForm.control}
                  name="content"
                  rules={{ required: "Content is required", minLength: { value: 1, message: "Content cannot be empty" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter note content" rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Note
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Right Column - Get/Update/Delete Note */}
        <Card>
          <CardHeader>
            <CardTitle>Get / Update / Delete Note</CardTitle>
            <CardDescription>Operations on a specific note by ID</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...noteIdForm}>
              <form onSubmit={noteIdForm.handleSubmit(fetchNoteById)} className="space-y-4">
                <FormField
                  control={noteIdForm.control}
                  name="noteId"
                  rules={{ 
                    required: "Note ID is required",
                    validate: (value) => {
                      const num = parseInt(value);
                      if (isNaN(num) || num <= 0) {
                        return "Note ID must be a positive number";
                      }
                      return true;
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter note ID" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="outline" className="w-full">
                  Get Note
                </Button>
              </form>
            </Form>

            {selectedNote && (
              <>
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <h3 className="font-semibold mb-2">Selected Note:</h3>
                  <p className="text-sm text-muted-foreground">ID: {selectedNote.id}</p>
                  <p className="text-sm text-muted-foreground">Title: {selectedNote.title}</p>
                  <p className="text-sm text-muted-foreground">Content: {selectedNote.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Created: {new Date(selectedNote.createdAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Updated: {new Date(selectedNote.updatedAt).toLocaleString()}
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Update Note</CardTitle>
                    <CardDescription>Edit the selected note</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...updateNoteForm}>
                      <form onSubmit={updateNoteForm.handleSubmit(updateNote)} className="space-y-4">
                        <FormField
                          control={updateNoteForm.control}
                          name="title"
                          rules={{ required: "Title is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter note title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={updateNoteForm.control}
                          name="content"
                          rules={{ required: "Content is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter note content" rows={4} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-2">
                          <Button type="submit" variant="outline" className="flex-1">
                            Update Note
                          </Button>
                          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                              <Button type="button" variant="destructive" className="flex-1">
                                Delete Note
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the note
                                  {selectedNote && ` "${selectedNote.title}"`} (ID: {selectedNote?.id}).
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    deleteNote();
                                    setDeleteDialogOpen(false);
                                  }}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Notes List */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Notes</CardTitle>
          <CardDescription>List of all notes in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchAllNotes} variant="outline" className="mb-4">
            Refresh List
          </Button>
          {notes.length === 0 ? (
            <p className="text-gray-500">No notes found. Create one to get started!</p>
          ) : (
            <div className="space-y-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    noteIdForm.setValue("noteId", note.id.toString());
                    setSelectedNote(note);
                    // Only update the update form, not the create form
                    updateNoteForm.reset({
                      title: note.title,
                      content: note.content,
                    });
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">ID: {note.id} - {note.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{note.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Created: {new Date(note.createdAt).toLocaleString()} | Updated:{" "}
                        {new Date(note.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
        </div>
      </main>
    </div>
  );
};

export default Notes;
