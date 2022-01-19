import express from "express"
import authRoute from "./auth.route"
import userRoute from "./user.route"
import { Request, Response } from "express";

const router = express.Router();

const defaultRoutes = [
    { path: '/', route: authRoute },
    { path: '/', route: userRoute },
];

defaultRoutes.map(route => router.use(route.path, route.route));

router.get("/test", (req: Request, res: Response) => {
    return res.status(200).json({
        status: "success",
        message: "Test route"
    });
});

export default router;