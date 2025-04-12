import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if (!req.auth.userid) {
        return res.status(401).json({ message: "Unauthorized - You must be logged in" });

    }
    next();
};

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userid);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if (!isAdmin) {
            return res.status(403).json({ message: "Forbidden - You do not have permission to access this resource" });

        }
        next();
    } catch (error) {
        next(error);
    }
}