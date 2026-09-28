const express=require("express");
const mongoose=require("mongoose");

const app=express();

app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/recharge");

const Recharge=mongoose.model("Recharge",{

number:String,
operator:String,
plan:String,
payment:String,
time:{
type:Date,
default:Date.now
}

});

app.post("/save",async(req,res)=>{

await Recharge.create(req.body);

res.json({success:true});

});

app.get("/admin",async(req,res)=>{

const data=await Recharge.find().sort({time:-1});

res.json(data);

});

app.listen(process.env.PORT || 3000,()=>{

console.log("Server running");

});