import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/./../.env.dev' });
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import UserRoutes from '@/modules/user/user.routes';
import AuthRoutes from '@/modules/user/auth.routes';
import TweetRoutes from '@/modules/tweet/tweet.routes';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
import prisma from './utils/prisma';

const runServer = () => {
  const port = process.env.PORT;

  const app = express();
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true
    })
  );
  app.use(express.json());
  app.use(
    fileUpload({
      useTempFiles: true,
      limits: {
        files: 4,
        fileSize: 1 * 1024 * 1024
      },
      limitHandler: (_, res) => {
        return res
          .status(413)
          .json({ message: 'File too large. Maximum 1 MB allowed' });
      },
      abortOnLimit: true
    })
  );
  app.use(cookieParser());
  app.use('/api/users', UserRoutes);
  app.use('/api/auth', AuthRoutes);
  app.use('/api/tweets', TweetRoutes);

  app.use((err: any, _: Request, res: Response, __: NextFunction) => {
    console.error(err.stack);
    return res.status(500).json({ message: 'Something went wrong' });
  });

  app.listen(port, () => {
    cloudinary.v2.config({
      api_key: process.env.CLOUDINARY_KEY!,
      api_secret: process.env.CLOUDINARY_SECRET!,
      cloud_name: process.env.CLOUDINARY_NAME!
    });
    console.log('environment:', process.env.NODE_ENV);
    console.log(`server: http://localhost:${port}`);
  });
};

prisma
  .$connect()
  .then(() => {
    console.log('db: mysql');
    runServer();
  })
  .catch((err) => {
    console.log(err);
  });
