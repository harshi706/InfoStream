import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'This field is required']
    },
    username: {
        type: String,
        required: [true, 'This field is required']
    },
    image:{
        type:String,
    }
})



const User=models.User || model("User",UserSchema);

export default User;