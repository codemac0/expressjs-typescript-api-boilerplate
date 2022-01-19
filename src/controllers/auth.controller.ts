
import Joi from "joi"
import httpStatus from "http-status"
import User from "../models/user.model"
import ApiError from "../utils/ApiError"
import * as service from "../services"
import catchAsync from "../utils/catchAsync"
import sanitize from "../utils/sanitize"
import { Request, Response } from "express"

import * as dotenv from "dotenv"
dotenv.config();

export const signup = catchAsync(async (req: Request, res: Response) => {
    req.body = sanitize(req.body, res);
    delete req.body.confirmPassword;
    const user = await service.userService.createUser(req.body);
    const token = await service.tokenService.generateAuthTokens(user);

    return res.status(200).json({
        success: true,
        message: "Registration Success",
        accessToken: token
    });
});

export const signin = catchAsync(async (req: Request, res: Response) => {
    req.body = sanitize(req.body, res);
    const { email, password } = req.body;
    const user = await service.authService.loginUser(email, password);
    const token = await service.tokenService.generateAuthTokens(user);

    return res.send({
        success: true,
        message: "Signed in successfully",
        accessToken: token
    });
});

export const signout = catchAsync(async (req: Request, res: Response) => {
    req.body = sanitize(req.body, res);
    await service.authService.logout(req.body.accessToken);
    res.status(httpStatus.NO_CONTENT).send({message: "Signed out."});
});
