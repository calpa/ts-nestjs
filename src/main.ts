import { AppMiddleware } from './app/app.middleware';
import * as express from 'express';

const app = express();

app.use((req, res, next) => {
  const nest = new AppMiddleware(app).use(req, res, next);
  nest.then(() => {
    next();
  }).catch(err => {
    console.log(JSON.stringify(err));
    next();
  });
});


module.exports = app;