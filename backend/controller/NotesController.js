import Notes from "../model/NotesModel.js"

async function GetNotes(req, res){
    try{
        const result = await Notes.findAll()
        res.status(200).json(result)
    }catch(error){
        console.log(error.message)
    }
}

async function CreateNotes(req, res){
    try{
        const inputResult = req.body
        Notes.create(inputResult)
        res.status(201).json({
            success: true,
            message: "Note created",
        })
    }catch(error){
        console.log(error.message)
    }
}

async function UpdateNotes(req, res) {
    try{
        const editData = req.body
        const id = req.params.id

        Notes.update(editData, {
            where: {id},
        })
        res.status(200).json({
            message:"Note updated",
        })
    }catch(err){
        console.log(err.message)
    }
}

async function DeleteNotes(req, res) {
    try{
        const id = req.params.id

        Notes.destroy({
            where: {id},
        })
        res.status(200).json({
            message:"Note deleted",
        })
    }catch(err){
        console.log(err.message)
    }
}

export {GetNotes, CreateNotes, UpdateNotes, DeleteNotes}