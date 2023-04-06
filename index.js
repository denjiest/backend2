import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"

import UserRoute from "./routes/UserRoutes.js"
import AuthRoute from "./routes/AuthRoute.js"

import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();

const app = express();

const filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(filename);

const fileStorage = multer.diskStorage({
    destination :(req,fie,cb) => {
        cb(null, 'images');
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+ '-' + file.originalname)
    }
});;

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/png'
     || file.mimetype === 'image/jpg' 
     || file.mimetype === 'image/jpeg'){
        cb(null, true)
     }else{
        cb(null, false)
     }
}

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter:fileFilter}).single('image'))

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('welcome to the new e')
})

app.get('/local', (req,res)=>{
    res.send('berjalan di localhost')
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(UserRoute,
  AuthRoute)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on port "+port+"");
});