import {Schema,model}from "mongoose"
 


const  userSchema = new Schema({
    email : {
        type : String,
        require : true,
        unique: true,
    },
    password : {
        type : String,
        require : true,
    },
    role  : {
        type : String,
        default : "user",
        enum : ["user","moderator","admin"]

    },
    skills : [String],
    createdAt : {
        type : Date,
        default : Date.now
    }
})


export default model("User",userSchema);