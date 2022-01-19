import httpStatus from "http-status"
import {userService, tokenService} from "./"
import ApiError from "../utils/ApiError"
import tokenTypes from "../config/token";
import {Token} from "../models"

type loginUser = (email: string, password: string) => any;

const loginUser: loginUser = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    if (!user.active) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You must verify your email to activate your account');
    }
    return user;
};

const logout = async (accessToken: string) => {
    const accessTokennDoc = await Token.findOne({ token: accessToken, type: tokenTypes.ACCESS, blacklisted: false });
    if (!accessTokennDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await accessTokennDoc.remove();
};

export {
    loginUser,
    logout
}