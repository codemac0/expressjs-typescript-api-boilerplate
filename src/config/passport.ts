import passportJwt from "passport-jwt"
import { config } from "./config";
import tokenTypes from "./token";
import { User } from "../models";

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload:any, done:any) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type');
        }
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(undefined, false);
        }
        done(undefined, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
export default jwtStrategy;