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

UserSchema.pre( //pre-hook
//Before saving the info in the db, this function will be called
    'save',
    //this - Current document to be saved
    async (next) =>{
        const user = this;
        //10 rep the salt cost - Iterations ran for hashing.
        //The higher the no. the higher the iterations hence 
        //the more computation required which may impact app
        //performance - but pwd will be more secure.
        const hash = await bcrypt.hash(this.password, 10)
        //Hash the password
        this.password = hash;
        next()
    }
)

//Validate user credentials when logging into the system
UserSchema.methods.isValidPassword = async (password) => {
    const user = this;
    //Hash the pwd sent and compare it with one stored in the db
    const compare = await bcrypt.compare(password, user.password);

    return compare
}


export const UserModel = mongoose.model('user', UserSchema)
