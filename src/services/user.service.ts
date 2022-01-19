import httpStatus from "http-status";
import {User} from "../models"
import ApiError from "../utils/ApiError";

interface IUserType {
    name: string,
    email: string,
    password: string
}

const createUser = async (userBody: IUserType) => {
    const isEmailExists = await User.findOne({email: userBody.email});
    if (isEmailExists) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    return User.create(userBody);
};

const getUserById = async (id: number) => {
    return User.findById(id);
};

const getUserByEmail = async (email: string) => {
    return User.findOne({ email });
};

export {
    createUser,
    getUserById,
    getUserByEmail
}