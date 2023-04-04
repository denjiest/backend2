import express from "express"
import cors from "cors"

const app = express();

app.use(cors())

app.get('/', (req,res)=>{
    console.log("hello world")
})

const port = 3000;
app.listen(port, () => {
  console.log("Server is listening on port "+port+"");
});