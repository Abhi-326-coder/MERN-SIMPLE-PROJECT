import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json());// 
app.use(express.urlencoded({extended:true}));

// api to get all the products data 
app.get("/api/products",async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({success:false,data:products})
    } catch (error) {
        console.log("error in fetching products:",error.message);
        res.status(500).json({success:false,message:"Server error"})
    }
})

// api to create a product from taking data from user
app.post("/api/products",async(req,res)=>{
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"Please provide all fields"});
    }
    const newProduct = new Product(product);// We can also created product using product.create({data object})

    try {
        await newProduct.save();
        res.status(200).json({success:true, data:newProduct});
    } catch (error) {
        console.error("Error in Create Product:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}) 

// api to delete the product from database using the id  
app.delete("/api/product/:id",async (req,res)=>{
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"});
    } catch (error) {
        res.status(404).json({success:false,message:"product not found"})
    }
});

// api to update the product details from the database hence using put route handler
app.put("/api/products/:id",async(req,res)=>{
    const {id} = req.params;
    const product = req.body;
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedProduct});
    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
});

app.listen(5000,()=>{
    connectDB();
    console.log("server started at port 5000");
})

// O61McmZgFSfLuBHr