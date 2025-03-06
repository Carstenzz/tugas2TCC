import { Sequelize } from "sequelize";

const db = new Sequelize("tcc_karten", "root", "", {
    host: "localhost",
    dialect: "mysql",
})

export default db