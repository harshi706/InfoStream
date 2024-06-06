import mongoose from "mongoose";

let isConnected=false;

export const connectToDB=async()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('DB is already connected');
        return;
    }
    try{
        await mongoose.connect("mongodb+srv://infostream:infostream@cluster0.znumhyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            dbName:'share_prompt'
        })
        isConnected=true;
        console.log("DB is connected");
    }catch(err){
        console.log(err)
    }
}