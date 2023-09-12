import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/./../.env.dev' });

import TweetRoutes from '@/routes/tweet.routes';
import AuthRoutes from '@/routes/auth.routes';
import UserRoutes from '@/routes/user.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import prisma from './prisma';
import CloudinaryService from './services/CloudinaryService';
import FileSystemService from './services/FileSystemService';

const initServer = () => {
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
      limitHandler: (req, res) => {
        const files = req.files?.files;
        if (files) {
          FileSystemService.removeIncomingFiles(files);
        }
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
    CloudinaryService.init();
    console.info('environment:', process.env.NODE_ENV);
    console.info(`server: http://localhost:${port}`);
  });
};

const initPrisma = async () => {
  await prisma.$connect();
  console.info('db: mysql');
};

const run = async () => {
  try {
    await initPrisma();
    initServer();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();
