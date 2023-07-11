import { Schema,model } from "mongoose";

const userSchema= new Schema({
fullName:{
    type:"String",
    required:[true,"Name is required"],
    mingLength:[5,"Name must be of atleast 5 characters"],
    maxLength:[50,"Name should be less than 50 charadters"],
    lowercase:true,
    trim:true
},
email:{
    type:"String",
    required:[true,"Email is required"],
    lowercase:true,
    trim:true,
    unique:[true,"Email already exists"],
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
},
password:{
    type:"String",
    required:[true,"Password is required"],
    minLength:[8,"Password must of of minimum length of 8"],
    select:false
},
avatar:{
    public_id:{
        type:"String",

    },
    secure_url:{
        type:"String"
    }
},
role:{
    type:"String",
    enum:["USER","ADMIN"],
    default:"USER"
},
forgotPasswordToken:String,
forgotPasswordExpiry:Date
},
{
    timestamps:true
});

const user=model('User',userSchema)

export default user;