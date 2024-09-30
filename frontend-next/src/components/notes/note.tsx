'use client'

import { useState } from "react";

const getCookieValue = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

const Note = ({ note, handleNoteChange, handleDelete }: any) => {
  return (
    <div className="flex gap-2">
      {/* <input
        value={note.content}
        onChange={(e) => handleNoteChange(note.id, e.target.value)}
      /> */}
      <div>{note.content} </div>
      <button onClick={() => handleDelete(note.id)} className="bg-red-500 text-white px-2">Delete</button>
    </div>
  );
};

export default function Notes({data}: any) {
//   const initialData = [
//     { id: 0, content: "Yo" },
//     { id: 1, content: "Yes" },
//     { id: 2, content: "Yup" },
//     { id: 3, content: "Yep" },
//     { id: 4, content: "Yeah" }
//   ];

  const [allNotes, setAllNotes] = useState(data ?? []);
  const [newNote, setNewNote] = useState("");

  // Function to handle adding a new note
  const addNote = async () => {
    if (newNote.trim() === "") return; // Do not add empty notes

    const newId = allNotes.length > 0 ? allNotes[allNotes.length - 1].id + 1 : 0;
    const updatedNotes = [...allNotes, { id: newId, content: newNote }];
    setAllNotes(updatedNotes);
    
    // Add note to database
    const userEmail = getCookieValue('userEmail')
    await fetch('http://localhost:3001/note/create', {
        
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: `userEmail=${userEmail}`, // Add the cookie to the headers
            },
            body: JSON.stringify({ content: newNote }), // Optional since you're verifying by cookie
            credentials: "include", // Important for including cookies
          
    })

    setNewNote(""); // Clear input field
  };

  // Function to handle note content changes
  const handleNoteChange = (id: number, newContent: string) => {
    setAllNotes(
      allNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  // Function to handle deleting a note
  const handleDelete = async (id: number) => {
    console.log(id)
    // Delete note from database
        const userEmail = getCookieValue('userEmail')
        await fetch(`http://localhost:3001/note/delete/${id}`, {
            
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Cookie: `userEmail=${userEmail}`, // Add the cookie to the headers
                },
                credentials: "include", // Important for including cookies
              
        })

    setAllNotes(allNotes.filter(note => note.id !== id));
  };

  return (
    <section className="flex flex-col gap-3">
      {allNotes.length > 0 && allNotes.map((note: any) => (
        <Note key={note.id} note={note} handleNoteChange={handleNoteChange} handleDelete={handleDelete} />
      ))}

      {/* Input to add new notes */}
      <div className="flex gap-2">
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add new note"
        />
        <button onClick={addNote}>Add Note</button>
      </div>
    </section>
  );
}
