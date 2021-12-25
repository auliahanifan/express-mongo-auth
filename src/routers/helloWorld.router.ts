import * as express from 'express';
import { HelloWorldController }  from '../controllers/impl/helloWorld.controller';

let helloWorldRouter = express.Router();
let helloWorldController = new HelloWorldController();

helloWorldRouter.get("/", async function (req: any, res: any) {
    const result = await helloWorldController.getHelloWorld(req);
    res.status(result.status).json(result.body);
});

export {
    helloWorldRouter
}