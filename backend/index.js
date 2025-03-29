import express from "express"
import cors from "cors"
import NotesRoute from "./routes/NotesRoutes.js"

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
}))
app.use(express.json())
app.use(NotesRoute)
app.listen(4200, ()=>{console.log("alo bg ( ﾉ ﾟｰﾟ)ﾉ")})