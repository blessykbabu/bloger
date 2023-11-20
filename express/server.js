import express from "express";
import dotenv from "dotenv";

import conn from "./connection.js";
import router from "./router.js";

dotenv.config();

const app = express();

app.use("/", express.static("./static"));
app.use(express.json());
app.use("/api", router);

conn().then(() => {
    app.listen(process.env.PORT, error => {
        if(error) {
            console.log(error);
            return;
        }
        console.log("Server strted");
    });
})
.catch(error => {
    console.log(error);
})