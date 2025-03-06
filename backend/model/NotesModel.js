import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Notes = db.define("note", {
    title: Sequelize.STRING,
    content: Sequelize.STRING,
})

db.sync().then(()=>{console.log("db sync")})

export default Notes