import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('welcome to the new e')
})

app.get('/local', (req,res)=>{
    res.send('berjalan di localhost')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on port "+port+"");
});