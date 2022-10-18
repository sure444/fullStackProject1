const express=require('express')
const Router=express.Router()
const groceryitemModel=require('../model/groceryitemModel')
Router.post('/add',(req,res)=>{
    const data=req.body
    const grocerydata=new groceryitemModel({
        groceryItem:data.groceryItem,
        isPurchased:data.isPurchased
    })
    grocerydata.save().then((result)=>res.send({result:"success"})).catch((err)=>res.send('error'))
})
Router.get('/getAll',async(req,res)=>{
    try{
         const result=await groceryitemModel.find({})
         res.send(result)
     }
     catch(err){
         res.send('err')
     }
 })
 Router.put('/updatePurchaseStatus/:_id',(req,res)=>{
    groceryitemModel.findByIdAndUpdate({_id: req.params._id},{isPurchased:req.body.isPurchased}).then((result)=>res.send({result:"success"})).catch((err)=>res.send('error'))
 })
/*Router.delete('/deletGroceryItem',(req,res)=>{
    groceryitemModel.findByIdAndDelete((req.body._id)).then((result)=>res.send({result:"success"})).catch((err)=>res.send('error'))


})*/
Router.delete('/deletGroceryItem/:_id',(req,res)=>{

    groceryitemModel.findByIdAndDelete({_id: req.params._id}).then((result)=>res.send({result:"success"})).catch((err)=>res.send('error'))


})
module.exports=Router