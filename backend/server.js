import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/",(req,res)=>{
    res.send("hello world");
}) 


app.listen(5000,()=>{
    console.log("server started at port 5000");
})

// O61McmZgFSfLuBHr