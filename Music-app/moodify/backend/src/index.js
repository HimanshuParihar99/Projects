import express from "express";
import dotenv from "dotenv";
import userRoutes from "./route/user.route.js";
import authRoutes from "./route/auth.route.js";
import adminRoutes from "./route/admin.route.js";
import songRoutes from "./route/song.route.js";
import albumRoutes from "./route/album.route.js";
import statRoutes from "./route/stat.route.js";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size
    }
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.use((err, req, res, next)=>{
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message});
});

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
    connectDB();
    console.log("Database connected successfully");
});