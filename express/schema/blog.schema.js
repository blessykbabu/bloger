import mongoose from "mongoose";


const schema = new mongoose.Schema({
  
    userId: {
        type: String
    },
      blog: {
        type: String
    },
    myfile:{
        type:String
    }
});

export default mongoose.model.Blogs || mongoose.model("Blog", schema);