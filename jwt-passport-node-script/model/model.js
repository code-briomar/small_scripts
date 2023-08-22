//mongoose lib defines schema mapped to the MongoDB collection
//mongoose lib takes the schema and converts it into a model.
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
});

export const UserModel = mongoose.model('user', UserSchema)
