const express=require("express")
const router =express.Router()
const zod=require("zod")
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require('../config');
const {authMiddleware} = require('../middleware');


const SignupSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})


router.post("/signup",async(req,res)=>{
    console.log("in signup ")
    console.log(req.body)
    try{
        // console.log("b4 here")
        const {success}=SignupSchema.safeParse(req.body)
        const {
            username , password, firstname , lastname
        } = SignupSchema.parse(req.body) ;
        // console.log(success)
        // return
        if(!success){
            return res.json({
                 message:"Email already taken/incorrect inputs"
            })
        }
        console.log("here")
        const currentuser=await User.findOne({
            username:username
        })
        console.log(currentuser)
        console.log("b4 if ")
        if (currentuser){
            return res.status(411).json({
                message:"Email already taken/incorrect inputs"
            })
        }
        console.log("after ")
                
        const dbuser= await User.create({
            username:username,
            password:password,
            firstname:firstname,
            lastname:lastname,
        })
        const userId=dbuser._id
        await Account.create({
            userId:userId,
            balance:1+Math.random()*1000
        })

        const token=jwt.sign({userId},JWT_SECRET)
        console.log("tokeen ")
        res.status(200).json({
            message:"user created succesfully",
            token:token
        })
    }catch (e){
        console.log(e.message)
        return res.status(500).json({
            message:e.message
        })
    };
    

})
router.post("/signin",async(req,res)=>{
    username=req.body.username
    password=req.body.password
    currentuser=await User.find({
      username,
      password
    })
    const userId=currentuser._id
    if(User){
        const token=jwt.sign({
            userId
        },JWT_SECRET)
        res.json({
        token:token})
        return
    }

 
    res.status(411).json({
        msg:"admin not found"
    })
    
})
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
router.put('/',authMiddleware,async(req,res)=>{
        const {success} =updateBody.safeParse(req.body)
        if(!success){
            res.status(411).json({
                message:"error while updating information"
            })
        }
         await  User.updateOne(req.body,{
            id:userId
         })
         res.json({
            message:"information updated succesfully"
         })
})
router.get("/bulk",async(req,res)=>{
    try{
    console.log(req.query.id)
    const filter =req.query.filter ||"";
    const users= await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
} catch (e) {
    console.log(e)

}
});


module.exports=router;