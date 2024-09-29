"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { verifyCookies } from "../../utils/verifyCookies";
const noteRouter = (0, express_1.Router)();
const prismaClient_1 = require("../../utils/prismaClient");
// Create note
noteRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in note create");
    const { content } = req.body;
    const cookies = req.cookies;
    const author = yield prismaClient_1.prisma.user.findUnique({
        where: {
            email: cookies.userEmail,
        },
    });
    if (!author) {
        return res.status(400).json({ error: "Title and AuthorId are required." });
    }
    try {
        const newNote = yield prismaClient_1.prisma.note.create({
            data: {
                content: content || null,
                authorId: author.id,
            },
        });
        res.status(201).json(newNote);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating the note." });
    }
}));
// Delete note
noteRouter.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in note delete");
    const cookies = req.cookies;
    // Check if user is authenticated
    const author = yield prismaClient_1.prisma.user.findUnique({
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
        const deletedNote = yield prismaClient_1.prisma.note.delete({
            where: {
                id: noteId,
                authorId: author.id, // Ensure the author is the one deleting the note
            },
        });
        res
            .status(200)
            .json({ message: "Note deleted successfully.", deletedNote });
    }
    catch (error) {
        //   if (error.code === 'P2025') {
        //     // Error code for record not found
        //     return res.status(404).json({ error: "Note not found." });
        //   }
        res.status(500).json({ error: "Error deleting the note." });
    }
}));
// Get all notes for the current user
noteRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in get all notes");
    const cookies = req.cookies;
    // Check if user is authenticated
    const author = yield prismaClient_1.prisma.user.findUnique({
        where: {
            email: cookies.userEmail,
        },
    });
    if (!author) {
        return res.status(401).json({ error: "Unauthorized. User not found." });
    }
    try {
        // Fetch all notes for the authenticated user
        const notes = yield prismaClient_1.prisma.note.findMany({
            where: {
                authorId: author.id, // Ensure we get notes that belong to the authenticated user
            },
        });
        res.status(200).json(notes); // Return the notes as a JSON response
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching notes." });
    }
}));
exports.default = noteRouter;
