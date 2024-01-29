const mongoose=require("mongoose");

const DB=process.env.mongoURL;

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("database connected for dipto")).catch((err)=>console.log("err",err))