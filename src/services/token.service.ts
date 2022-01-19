import jwt from "jsonwebtoken"
import moment from "moment";
import {config} from "../config/config";
import tokenTypes from "../config/token"
import ApiError from "../utils/ApiError";
import {Token} from "../models"
import {userService} from "../services"

const generateToken = (userId: number, expires: moment.Moment, type: string, secret: jwt.Secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

const saveToken = async (token: string, userId: number, expires: moment.Moment, type: string, blacklisted: boolean = false) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
};

const generateAuthTokens = async (user: any) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationDays, 'days');
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);
    await saveToken(accessToken, user.id, accessTokenExpires, tokenTypes.ACCESS);

    return {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
    };
};

const verifyToken = async (token: string, type: string) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
    if (!tokenDoc) {
      throw new Error('Token not found');
    }
    return tokenDoc;
};

export {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens
  };