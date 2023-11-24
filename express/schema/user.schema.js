import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
  
    email: {
        type: String,
        required: true
    },

      profile:{
        type:String
    }
    

});

export default mongoose.model.Logins || mongoose.model("Login", schema);