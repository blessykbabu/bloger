


import bcrypt from "bcrypt";
import userSchema from "./schema/user.schema.js";
import blogSchema from "./schema/blog.schema.js";
import jwt from "jsonwebtoken";



const { sign } = jwt;

export async function register(req, res) {
    try {
        let { username, password,email } = req.body;
        if( username.length <= 4 && password.length <= 4) {
            return res.json("Invalid username or password");
        }
        let hashedPass = await bcrypt.hash(password, 10);
        let userExist = await userSchema.findOne({ username });
        if(userExist) {
            return res.status(401).send("User already exists");
        }
        let result = await userSchema.create({ username, password: hashedPass ,email});
        if(result){
            return res.status(200).send("Registration successful!");
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}

export async function login(req, res) {
    try {
        let { username, password } = req.body;
        if( username.length < 4 && password.length < 4) {
            return res.json("Invalid username or password");
        }
        let user = await userSchema.findOne({ username });
        if(!user) {
            return res.status(403).send("Invalid username or password");
        }
        let passCheck = await bcrypt.compare(password, user.password);
        if(passCheck) {
            let token = await sign({
                username: user.username,
                id: user._id
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "24h"
            })
            return res.status(200).json({
                msg: "Login successful...",
                token: token
            })
        }
        return res.status(403).send("invalid username or password")
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}

export async function addBlog(req, res) {
    try {
        let { blog } = req.body;
        let { id } = req.user;
        let result = await blogSchema.create({
            blog,
            userId: id
        })
        res.json("Your Blog Succefully Added, Have a nice Day!!!!!!!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}

export async function  getBlog(req,res){
    try{
        let {id}=req.user;
        let result=await blogSchema.find({userId:id});
        console.log(result)
        if(result.length > 0){
            return res.status(200).send(result)

        }
        return res.status(200).send({msg:"No Blog to show"})
    }
    catch(error){
        console.log(error)
        return res.status(500).send("Error occured")
    }
}

export async function profile(req, res) {
    try {
        let user = req.user;
        let userDetails = await userSchema.findOne({ _id: user.id },{ password: 0 });
        if(userDetails) {
            return res.json(userDetails);
        }
        return res.status(404).send("User not found");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}

export async function  getAll(req,res){
    try {
        let blog=await blogSchema.find();
        return res.json(blog)
    } catch (error) {
        console.log(error)
        return res.status(500).send("error occured")
    }
}