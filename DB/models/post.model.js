
import{model, Schema} from "mongoose";



const postSchema = new Schema({
    title:{
        type:String,
        required:[true,"this field is required"],
    },
    description:{
        type:String,
        required:[true,"this field is required"],
    },
   
}, {timestamp:true})

const Post = model("Post",postSchema)

export default Post;