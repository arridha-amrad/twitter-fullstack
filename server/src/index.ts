import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import UserRoutes from "@/modules/user/user.routes";
import TweetRoutes from "@/modules/tweet/tweet.routes";
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import prisma from "./utils/prisma";
import { Prisma, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const runServer = () => {
	const port = process.env.PORT;

	const app = express();
	app.use(
		cors({
			origin: process.env.CLIENT_URL,
			credentials: true,
		})
	);
	app.use(express.json());
	app.use(
		fileUpload({
			useTempFiles: true,
		})
	);
	app.use(cookieParser());
	app.use("/api/users", UserRoutes);
	app.use("/api/tweets", TweetRoutes);
	app.use("/api/test", (req, res) => res.send("Hello World"));

	app.listen(port, () => {
		cloudinary.v2.config({
			api_key: process.env.CLOUDINARY_KEY!,
			api_secret: process.env.CLOUDINARY_SECRET!,
			cloud_name: process.env.CLOUDINARY_NAME!,
		});
		console.log(`Server running at http://localhost:${port} 👍`);
	});
};

prisma
	.$connect()
	.then(() => {
		console.log("db ready 👍");
		runServer();
	})
	.catch((err) => {
		console.log(err);
	});
