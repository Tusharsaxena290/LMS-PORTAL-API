import express from "express";
const app=express();
import cors from"cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js"
import errorMiddleware from "./middlewares/error.middleware.js";

app.use(express.json());
app.use(cors({
origin:[process.env.FRONTEND_URL],
credentials:true
}))
app.use(cookieParser());
app.use(morgan('dev')) //logger middleware)

app.use("/ping",(req,res)=>{
    res.send('pong');
})

//user 
app.use("/api/v1/use",userRoutes);

// routes for 3 different routes
app.all('*',(req,res)=>{
    res.status(404).send("OOPS 404 page not found");

})
app.use(errorMiddleware);

export default app;