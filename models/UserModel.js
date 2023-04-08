import db from "../config/Database.js"
import Sequelize from "sequelize"

const User = db.define('users',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true
    },
    name:{
        AllowNUll:false,
        type:Sequelize.STRING,
        unique:{
            value:"name"
        }
    },
    username :{
        AllowNull:false,
        type:Sequelize.STRING,
        unique:{
            value:"username",
            // msg:"Username Sudah Ada !"
        }
    },
    email:{
        AllowNull:false,
        type:Sequelize.STRING,
        unique:{
            value:"email",
            // msg:"Email Sudah Ada"
        }
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image:{
        type: Sequelize.STRING,
        defaultValue:"images/default.jpg"
    },
    createdAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt:{
        type:Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    freezeTableName : true,
    timestamps:false
})

export default User;

(async()=>{
    await db.sync();
})();