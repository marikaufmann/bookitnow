import express, { Request, Response, urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { connectDb } from "./config/dbConn";
import mongoose from "mongoose";
import { logEvents, logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelsRoutes from "./routes/my-hotels";
import hotelsRoutes from './routes/hotels'
import articlesRoutes from './routes/articles'
import { allowedOrigins } from "./config/allowedOrigins";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const PORT = process.env.PORT || 7010;
const app = express();
connectDb();
app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin: string | undefined, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelsRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/articles", articlesRoutes);
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, async () => {
    console.log(`server running on localhost:${PORT}`);
  });
});
mongoose.connection.on("error", (err) => {
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
