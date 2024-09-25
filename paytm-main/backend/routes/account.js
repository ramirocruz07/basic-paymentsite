const { authMiddleware } = require("../middleware")
const express=require('express')
const {Account, User}=require('../db/index')

const mongoose=require('mongoose')
const router=express.Router()
router.get('/balance',authMiddleware,async (req,res)=>{
        const account=await Account.findOne({
            userId:req.userId
        })
        res.json({
            balcance:account.balance
        })

})
router.post('/transfer',authMiddleware,async(req,res)=>{
    const session= await mongoose.startSession()
    session.startTransaction()
    const{amount,to}=req.body
   
    const account=await Account.findOne({
        userId:req.userId
    }).session(session)

    if(!account?.amount<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Insufficient balcance"
        })
    }
    const toaccount=await User.findOne({
        userId:to
    }).session(session)
    
    if(!toaccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Invalid Account"
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:req.userId},{$inc:{balance:amount}}).session(session)

    await session.commitTransaction();
    res.json({
        message:"Transfer Successful"
    })
})
module.exports = router;