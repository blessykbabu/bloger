import { Router } from "express";
import auth from "./middlewares/auth.js"

import * as rh from "./request-handlers.js";


const router = Router()

router.route("/register").post(rh.register);
router.route("/login").post(rh.login);
router.route("/profile").get(auth,rh.profile);
router.route("/add-blog").post(auth, rh.addBlog);
router.route("/get-blog").get(auth,rh.getBlog);
router.route("/get-profile").get(auth,rh.getProfile);
router.route("/get-all").get(rh.getAll)

export default router;
