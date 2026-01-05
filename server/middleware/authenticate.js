import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return next(errorHandler(401, "Please login to access this resource"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();
    } catch (err) {
        return next(errorHandler(401, "Invalid or expired token"));
    }
};
