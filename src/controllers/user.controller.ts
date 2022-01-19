import Joi from "joi"
import httpStatus from "http-status"
import User from "../models/user.model"
import ApiError from "../utils/ApiError"
import * as service from "../services"
import catchAsync from "../utils/catchAsync"
import { Request, Response } from "express"

import * as dotenv from "dotenv"
dotenv.config();

export const me = catchAsync(async (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        data: req.user
    });
});