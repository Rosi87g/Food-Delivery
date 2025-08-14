import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://teamfav19CreateStack:9HN8mI8WJlDL3bFr@cluster0.wz52z8p.mongodb.net/food-del').then(()=>
        console.log("DB Connected"));
}