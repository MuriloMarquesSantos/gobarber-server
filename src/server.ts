/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import routes from './routes/index';
import uploadConfig from './config/upload';
import './database';

const app = express();
const port = 3333;

app.use(routes);

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
