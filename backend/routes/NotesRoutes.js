import express from "express";
import { GetNotes, CreateNotes, UpdateNotes, DeleteNotes} from "../controller/NotesController.js";

const router = express.Router()

router.get("/Notes", GetNotes)
router.post("/add-Note", CreateNotes)
router.put("/edit-Note/:id", UpdateNotes)
router.delete("/delete-Note/:id", DeleteNotes)

export default router