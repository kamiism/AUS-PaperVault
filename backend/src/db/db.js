import mongoose from "mongoose";
import { DB_NAME, DB_URI } from "../config.js";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${DB_URI}/${DB_NAME}`);
        console.log(`CONNECTED TO : ${connection.connection.host}`);
    } catch (err) {
        console.error("Error: ", err);
        throw new Error("Error in connecting to DB");
    }
};

export default connectDB;
