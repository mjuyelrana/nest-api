import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: String,
  roles: Array,
  passwordHash: String
},{collection: "users", timestamps:true});