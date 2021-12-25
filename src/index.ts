import express from 'express';
import * as router from './routers';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const version = 'v1';

// enable json in body
app.use(bodyParser.json());

app.use(`/${version}/helloworld`, router.helloWorldRouter);

app.listen(port, () => {
  console.log(`express-mongo-auth app listening at http://localhost:${port}`);
})