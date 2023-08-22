//mongoose lib defines schema mapped to the MongoDB collection
//mongoose lib takes the schema and converts it into a model.
import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

UserSchema.pre(
    'save',
    async (next) =>{
        const user = this;
        const hash = await bcrypt.hash(this.password, 10)

        this.password = hash;
        next()
    }
)
export const UserModel = mongoose.model('user', UserSchema)
