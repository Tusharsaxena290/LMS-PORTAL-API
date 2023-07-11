import AppError from "../utils/error.util";

const register=async(req,res,next)=>{
const{fullName,email,password}=req.body;
if(!fullName||!email ||!password){
    return next(new AppError('All fields are required',400));

}
const userExists= await User.findOne({email});
if(userExists){
    return next(new AppError('Email already Exists',400));

}
const user = await User.create({
    email,
    password,
    avatar:{
        public_id:email,
        secure_url:"http://res.cloudinary.com"
    }
});
if(!user){
    return next(new AppError("User registeration failed",404));

}

//TODO: File Uplaod

await user.save();

}

const login=(req,res)=>{
    
}


const logout=(req,res)=>{
    
}

const getProfile=(req,res)=>{
    
}

export {
    register,login,logout,getProfile
}