import mongoose, {Schema,model}from "mongoose"
 


const  ticketSchema = new Schema({
    title : {
        type : String,
        require : true
    },
    description: String,
    status : {
        type: String ,default : "TODO"
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        default : null
    },
    priority : String,
    deadline : Date,
    helpfulNotes : String,
    relatedSkills : [String],
    createdAt:{
        type:Date,
        default : Date.now
    }

})


export default model("Ticket",ticketSchema);