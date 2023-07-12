import AppError from "../utils/error.util.js";

const cookieOptions={
    maxAge: 7*24*60*60*1000, //7days
    httpOnly:true,
    secure:true
}
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
    fullName,
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
user.password=undefined;
//token

const token= await user.generateJWTToken();
//set in cookie
res.cookie('token',token,cookieOptions)

res.status(201).json({

    success:true,
    message:"User registered successfully",
    user
})

}

const login=async(req,res)=>{

    try{
        const{email,password}=req.body;
        if(!email || !password){
            return next(new AppError("All fields are required",400));
    
        }
        const user=await User.findOne(
            {
                email
            }).select('+password');
            if(!user || !user.comparePassword(password)){
                return next(new AppError('Email or password does not match', 400));
    
            }
            const token = await user.generateJWTToken();
            user.password=undefined;
    
            res.cookie("token",token,cookieOptions);
    
            res.status(200).json({
                success:true,
                message:"Successful login",
                user
            })
    }
    catch(error){
        console.log(error.message);
        return next(new AppError(error.message,500));

    }
    

}


const logout=(req,res)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"User logged out successfully!"
    })
}

const getProfile=async(req,res)=>{
    try{
    const userId=req.user.id;
    const user= await User.findById(userId);
    res.status(200).json({
        success:true,
        message:"User details",
        user
    })
    }
    catch(error){
        return next(AppError("Filed to fetch profile details",400));

    }
    
}

export {
    register,login,logout,getProfile
}