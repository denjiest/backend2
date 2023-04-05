import {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const db = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect : "mysql"
})

// const db = new Sequelize(process.env.DB_URI, {
//     define:{
//         timestamps:false
//     }
// })
export default db