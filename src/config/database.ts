import mongoose from "mongoose"
import {config} from "./config"

const connectDB = async () => {
    try {
        mongoose.connect(config.mongoose.url, config.mongoose.options as mongoose.ConnectOptions);
        console.log("Database connection Success.");
    }
    catch(err:any) {
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;