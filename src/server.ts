/* eslint-disable no-console */
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes/index';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import ErrorMessages from './errors/ErrorMessages';
import './database';

const app = express();
const port = 3333;
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }
    console.error(error);
    return response.status(500).json({ message: ErrorMessages.INTERNAL_ERROR });
  },
);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
