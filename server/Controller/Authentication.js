const express = require("express")
const router = express.Router()
const UserSchema = require("../Models/Task")

router.post("/login",async(req,res)=>{
    const{email,password} = req.body;

    if(!email || !password){
        res.json("enter all details")
    }

    if(!UserSchema.findOne(email)){
        res.json("User doesn't exist")
    }

    if(password !== UserSchema.findById(email)) {
        res.json("Incorrect Password")
    }
})