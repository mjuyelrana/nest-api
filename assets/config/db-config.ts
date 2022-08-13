import * as mongoose from "mongoose";
import { MONGO_URI } from "../constants";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn.connection;
  }catch (error){
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
export default connectDb;