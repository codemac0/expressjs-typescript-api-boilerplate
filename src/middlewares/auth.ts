import passport from "passport"

const auth = () => async (req: any, res: any, next: (arg0: undefined) => any) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false })(req, res, next);
    })
    .then(() => next(undefined))
    .catch((err) => next(err));
};

export default auth;