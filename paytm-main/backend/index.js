const express = require("express");
const cors = require("cors");
const mainRouters=require("./routes/index")

const app =express()
app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouters);
app.all("*",(req,res,next)=>{
    console.error("No route found")
})
app.listen(3000,() => {
    console.info(`server up on port ${3000}`);
  })