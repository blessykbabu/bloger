


import bcrypt from "bcrypt";
import userSchema from "./schema/user.schema.js";
import jwt from "jsonwebtoken";



const { sign } = jwt;

export async function register(req, res) {
    try {
        let { username, password,email } = req.body;
        if( username.length < 4 && password.length < 4) {
            return res.json("Invalid username or password");
        }
        let hashedPass = await bcrypt.hash(password, 10);
        let userExist = await userSchema.findOne({ username });
        if(userExist) {
            return res.status(401).send("User already exists");
        }
        let result = await userSchema.create({ username, password: hashedPass ,email});
        return res.status(200).send("Registration successful!");
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
