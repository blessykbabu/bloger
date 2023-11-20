import bcrypt from "bcrypt";
import userSchema from "./schema/user.schema.js";


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
