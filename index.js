import express from "express"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('welcome to the new e')
})

const port = 3000;
app.listen(port, () => {
  console.log("Server is listening on port "+port+"");
});