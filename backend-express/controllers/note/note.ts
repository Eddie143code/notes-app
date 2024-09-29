import { Router } from "express";
// import { verifyCookies } from "../../utils/verifyCookies";

const noteRouter = Router();
import { prisma } from "../../utils/prismaClient";

// Create note
noteRouter.post("/create", async (req: any, res: any) => {
  console.log("in note create");

  const { content } = req.body;
  const cookies = req.cookies;
  const author = await prisma.user.findUnique({
    where: {
      email: cookies.userEmail,
    },
  });

  if (!author) {
    return res.status(400).json({ error: "Title and AuthorId are required." });
  }

  try {
    const newNote = await prisma.note.create({
      data: {
        content: content || null,
        authorId: author.id,
      },
    });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Error creating the note." });
  }
});

// Delete note
noteRouter.delete("/delete/:id", async (req: any, res: any) => {
  console.log("in note delete");

  const cookies = req.cookies;

  // Check if user is authenticated
  const author = await prisma.user.findUnique({
    where: {
      email: cookies.userEmail,
    },
  });

  if (!author) {
    return res.status(401).json({ error: "Unauthorized. User not found." });
  }

  const noteId = parseInt(req.params.id, 10); // Get note ID from parameters

  if (isNaN(noteId)) {
    return res.status(400).json({ error: "Invalid note ID." });
  }

  try {
    const deletedNote = await prisma.note.delete({
      where: {
        id: noteId,
        authorId: author.id, // Ensure the author is the one deleting the note
      },
    });

    res
      .status(200)
      .json({ message: "Note deleted successfully.", deletedNote });
  } catch (error) {
    //   if (error.code === 'P2025') {
    //     // Error code for record not found
    //     return res.status(404).json({ error: "Note not found." });
    //   }
    res.status(500).json({ error: "Error deleting the note." });
  }
});

// Get all notes for the current user
noteRouter.get("/all", async (req: any, res: any) => {
  console.log("in get all notes");

  const cookies = req.cookies;

  // Check if user is authenticated
  const author = await prisma.user.findUnique({
    where: {
      email: cookies.userEmail,
    },
  });

  if (!author) {
    return res.status(401).json({ error: "Unauthorized. User not found." });
  }

  try {
    // Fetch all notes for the authenticated user
    const notes = await prisma.note.findMany({
      where: {
        authorId: author.id, // Ensure we get notes that belong to the authenticated user
      },
    });

    res.status(200).json(notes); // Return the notes as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Error fetching notes." });
  }
});

export default noteRouter;
