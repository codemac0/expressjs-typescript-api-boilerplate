import Joi from "joi"
import httpStatus from "http-status";
import pick from "../utils"
import ApiError from "../utils/ApiError";
import {Schema} from "mongoose"
import { Request, Response, NextFunction } from "express";

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

    if (error) {
        const errorData: any = [];

        error.details.map((details) => {
            errorData[details.path[1]] = details.message;
        })

        return next(new ApiError(httpStatus.BAD_REQUEST, "Invalid data", errorData));
    }

    Object.assign(req, value);
    return next();
};

export default validate;