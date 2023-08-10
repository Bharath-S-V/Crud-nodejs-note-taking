const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {NoteModel}=require("../models/NoteModel")
const { authenticator } = require("../middleware/authenticator");
const noteRouter = express.Router();
noteRouter.use(authenticator);

noteRouter.get("/",async(req,res)=>{
    let token=req.headers.authorization
    jwt.verify(token,"bharath",async(err,decode)=>{
        try {
            let data= await NoteModel.find({user:decode.userId})
            res.send({
                data:data,
                message:"success",
                status:1
            })
        } catch (error) {
            res.send({
                message:error.message,
                status:0
            })
        }
        
        })
    })


noteRouter.post("/create",async(req,res)=>{
    const {title,body,user}=req.body;
    try {
        let note=new NoteModel({title,body,user});
        await note.save()
        res.send({
            message:"note created",
            status:1
        })

    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})


noteRouter.patch("/",async(req,res)=>{
    let {id,authorization}=req.headers
    try {
        await NoteModel.findByIdAndUpdate({_id:id},req.body)
            res.send({
                message:'Note updated',
                status:1
            })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})

noteRouter.delete("/",async(req,res)=>{
    let {id,authorization}=req.headers
    try {
        await NoteModel.findByIdAndDelete({_id:id})
            res.send({
                message:'Note deleted',
                status:1
            })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})





module.exports = {
  noteRouter,
};
