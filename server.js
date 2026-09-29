const express=require("express");
const mongoose=require("mongoose");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const fs=require("fs");

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rechargehub");

const Recharge=mongoose.model("Recharge",{

number:String,
operator:String,
plan:Number,
utr:String,
screenshot:String,
status:{type:String,default:"Pending"},
time:{type:Date,default:Date.now}

});

if(!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const storage=multer.diskStorage({

destination:(req,file,cb)=>cb(null,"uploads"),

filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname);
}

});

const upload=multer({storage});

app.use("/uploads",express.static("uploads"));

app.post("/submit",upload.single("screenshot"),async(req,res)=>{

const data=await Recharge.create({

number:req.body.number,
operator:req.body.operator,
plan:req.body.plan,
utr:req.body.utr,
screenshot:req.file?"/uploads/"+req.file.filename:"",
status:"Pending"

});

res.json({success:true,data});

});

app.get("/admin-data",async(req,res)=>{

const data=await Recharge.find().sort({time:-1});

res.json(data);

});

app.listen(process.env.PORT || 3000,()=>{

console.log("Server Started");

});