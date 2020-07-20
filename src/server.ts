/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import routes from './routes/index';
import './database';

const app = express();
const port = 3333;

app.use(routes);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
