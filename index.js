import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app = express();

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
  

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on port "+port+"");
});