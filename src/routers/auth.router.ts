import * as express from 'express';
import { UserMongooseAccessor } from '../accessors/impl/user.mongoose.impl.accessor';
import { AuthControllerImpl }  from '../controllers/impl/auth.impl.controller';
import { AuthServiceImpl } from '../services/impl/auth.impl.service';
import User from '../db/mongoose/models/user.mongoose.model';
import { UserLruCacheAccessor } from '../accessors/impl/user.lru.impl.accessor';

let authRouter = express.Router();
let userMongooseAccessor = new UserMongooseAccessor(User);
let userLruCacheAccessor = new UserLruCacheAccessor(userMongooseAccessor);
let authService = new AuthServiceImpl(userLruCacheAccessor);
let authController = new AuthControllerImpl(authService);

authRouter.post("/login", async function (req: any, res: any) {
    const result = await authController.login(req);
    res.status(result.status).json(result.body);
});

export {
    authRouter
}