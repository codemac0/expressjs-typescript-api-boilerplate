import express from "express"
import cors from "cors"
import passport from "passport"
import { config } from "./config/config"
import httpStatus from "http-status"
import connectDB from "./config/database"
import jwtStrategy from "./config/passport"
import routes from "./routes"
import ApiError from "./utils/ApiError"
import {errorHandler, errorConverter} from "./middlewares/error"

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, resp, next) => {
    next()
}, cors({ maxAge: 84600 }))

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

if (config.env === 'production') {
    // app.use('/v1/auth', authLimiter);
} else {
    app.get("/ping", (req, res) => {
      return res.send({
        error: false,
        message: "Server is healthy",
      });
    });
}

app.use('/api', routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "API endpoint not found."));
});

app.use(errorConverter);
app.use(errorHandler);

const server = app.listen(config.port, () => {
    console.log("Server started listening on Port : " + config.port);
});