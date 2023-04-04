import db from "../config/Database.js"
import Sequelize from "sequelize"

const User = db.define('user',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true
    },
    username :{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    }
},{
    freezeTableName : true,
    timestamps:false
})

export default User;

(async()=>{
    await db.sync();
})();