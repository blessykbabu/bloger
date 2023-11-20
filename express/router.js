import { Router } from "express";
import auth from "./middlewares/auth.js"

import * as rh from "./request-handlers.js";


const router = Router()

router.route("/register").post(rh.register);
router.route("/login").post(rh.login);



export default router;
