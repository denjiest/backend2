import Sequelize from "sequelize"
import dotenv from "dotenv"

dotenv.config()

// const db = new Sequelize(process.env.DATABASE,process.env.DB_USERNAME,process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect : process.env.DB_DIAsLECT
// })

const db = new Sequelize(process.env.DB_URI, {
    define:{
        timestamps:false
    }
})
export default db