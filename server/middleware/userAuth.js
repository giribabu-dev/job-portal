import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protectUser(req, res, next) {
    let token;

    // Use Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, token missing" })
    }

    try {
        const decoded = jwt.verify(token, process.env.USER_JWT_SECRET)

        req.user = await User.findById(decoded.id).select('-password')  // attach user to request
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }

        next();  // allow request to proceed
    }
    catch (error) {
        return res.status(401).json({ success: false, message: "Invalid/Expired token" })
    }
}
