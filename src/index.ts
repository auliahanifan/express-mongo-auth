import express from 'express';
import * as router from './routers';
import bodyParser from 'body-parser';
import './db/mongoose/conn.mongoose';
import './db/mongoose/seeder.mongoose';

const app = express();
const port = 3000;
const version = 'v1';

// enable json in body
app.use(bodyParser.json());

app.use(`/${version}/helloworld`, router.helloWorldRouter);
app.use(`/${version}/user`, router.userRouter);
app.use(`/${version}/auth`, router.authRouter);

app.listen(port, () => {
  console.log(`express-mongo-auth app listening at http://localhost:${port}`);
})