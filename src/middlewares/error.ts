import mongoose from "mongoose"
import httpStatus from "http-status"
import {config} from "../config/config"
import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express'

export const errorConverter: ErrorRequestHandler  = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, null, false, err.stack);
    }
    next(error);
};

export const errorHandler: ErrorRequestHandler  = (err, req, res, next) => {
    let { statusCode, message } = err;
    const { errorData } = err;
    if (config.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    if (config.env === 'development') {
        console.log(err);
    }

    res.status(statusCode).send({
        error: true,
        code: statusCode,
        message,
        errorData,
        ...(config.env === 'development' && { stack: err.stack }),
    });
};