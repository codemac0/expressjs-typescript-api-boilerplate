import sanitize from "mongo-sanitize";
import { Response } from "express";
import httpStatus from "http-status";

const sanitizeFunc = (body: any, res: Response) => {
    try {
        return sanitize(body)
    } catch (error) {
        console.log("clean-body-error", error);
        return res.status(500).json({
            error: true,
            message: "Could not sanitize body",
        });
    }
};

export default sanitizeFunc;