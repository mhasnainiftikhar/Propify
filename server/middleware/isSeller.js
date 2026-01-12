import { errorHandler } from "./errorHandler.js";

export const isSeller = (req, res, next) => {
    if (req.user && req.user.role === "seller") {
        next();
    } else {
        return next(errorHandler(403, "Only sellers are allowed to perform this action"));
    }
};
