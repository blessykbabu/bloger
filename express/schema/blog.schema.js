import mongoose from "mongoose";


const schema = new mongoose.Schema({
    blog: {
        type: String
    },
    userId: {
        type: String
    }
});

export default mongoose.model.Blogs || mongoose.model("Blog", schema);