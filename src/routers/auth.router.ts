import * as express from 'express';
import { UserMongooseAccessor } from '../accessors/impl/user.impl.accessor';
import { AuthControllerImpl }  from '../controllers/impl/auth.impl.controller';
import { AuthServiceImpl } from '../services/impl/auth.impl.service';
import User from '../db/mongoose/models/user.mongoose.model';

let authRouter = express.Router();
let userAccessor = new UserMongooseAccessor(User);
let authService = new AuthServiceImpl(userAccessor);
let authController = new AuthControllerImpl(authService);

authRouter.post("/login", async function (req: any, res: any) {
    const result = await authController.login(req);
    res.status(result.status).json(result.body);
});

export {
    authRouter
}