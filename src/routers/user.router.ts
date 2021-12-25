import * as express from 'express';
import { CustomerControllerImpl }  from '../controllers/impl/user.impl.controller';

let userRouter = express.Router();
let helloWorldController = new CustomerControllerImpl();

userRouter.get("/", async function (req: any, res: any) {
    const result = await helloWorldController.getOne(req);
    res.status(result.status).json(result.body);
});

export {
    userRouter
}