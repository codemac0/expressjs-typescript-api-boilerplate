import express from "express"
const router = express.Router();
import auth from "../middlewares/auth"
import * as Controller from "../controllers/user.controller"

router.get("/me", auth(), Controller.me);

export default router;