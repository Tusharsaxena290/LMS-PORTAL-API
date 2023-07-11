import mongoose from 'mongoose';
mongoose.set('strictQuery',false);
const connectionToDb=async()=>{
    try{
        const {connection}=await mongoose.connect(
            process.env.MONGOOSE_URL
        );
        if(connection){
            console.log(`Connected to the DataBase:${connection.host}`);
    
        }

    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }


   
}
export default connectionToDb;