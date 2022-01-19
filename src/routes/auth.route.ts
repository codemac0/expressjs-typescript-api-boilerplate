import express from "express"
import * as Controller from "../controllers/auth.controller"
import auth from "../middlewares/auth"
import validator from "../middlewares/validator"
import * as validation from "../validations/auth.validation"

const router = express.Router();

router.post("/signup", validator(validation.signup), Controller.signup);
router.post("/signin", validator(validation.signin), Controller.signin);
router.get("/signout", auth, validator(validation.signout), Controller.signout);

export default router;