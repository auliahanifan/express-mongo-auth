import * as express from 'express';
import { UserMongooseAccessor } from '../accessors/impl/user.impl.accessor';
import { UserControllerImpl }  from '../controllers/impl/user.impl.controller';
import User from '../db/mongoose/models/user.mongoose.model';
import { UserServiceImpl }  from '../services/impl/user.impl.service';
import { AuthAdminOnly, AuthAllUser, AuthUserSelfLimit } from '../utils/jwt';

let userRouter = express.Router();
let userAccessor = new UserMongooseAccessor(User);
let userService = new UserServiceImpl(userAccessor);
let userController = new UserControllerImpl(userService);

userRouter.get("/", async function (req: any, res: any) {
    await AuthAdminOnly(req, res);
    const result = await userController.getAll(req);
    res.status(result.status).json(result.body);
});

userRouter.get("/:username", async function (req: any, res: any) {
    await AuthUserSelfLimit(req, res);
    const result = await userController.getOne(req);
    res.status(result.status).json(result.body);
});

userRouter.post("/", async function (req: any, res: any) {
    await AuthAdminOnly(req, res);
    const result = await userController.insertOne(req);
    res.status(result.status).json(result.body);
});

userRouter.put("/", async function (req: any, res: any) {
    await AuthAdminOnly(req, res);
    const result = await userController.updateOne(req);
    res.status(result.status).json(result.body);
});

userRouter.delete("/:username", async function (req: any, res: any) {
    await AuthAdminOnly(req, res);
    const result = await userController.deleteOne(req);
    res.status(result.status).json(result.body);
});

export {
    userRouter
}