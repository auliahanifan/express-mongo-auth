import { UserAccessor } from "../api/user.api.accessor";
import User from "../../db/mongoose/models/user.mongoose.model";
import { UserInput } from "../../dtos/inputs/user.input";
import { UserOutput } from "../../dtos/outputs/user.output";

export class UserMongooseAccessor implements UserAccessor {
    private _c: typeof User;

    constructor(userCtx: typeof User) {
        this._c = userCtx;
    }
    async getAll(): Promise<UserOutput[]> {
        return this._c.find({})
        .then(data => {
            const res: UserOutput[] = new Array();

            for (var d of data) {
                res.push(UserOutput.fromObject(d))
            }
            return res;
            })
        .catch(err => {
            console.log(`failed getAll`,err)
            return err;
        });     
    }

    async getOne(username: String): Promise<UserOutput> {
        return this._c.findOne({ username: username }).exec()
        .then(data => {
            const res: UserOutput = UserOutput.fromObject(data);
            return res;
            })
        .catch(err => {
            console.log(`[uid:${username}]: failed getOne`,err)
            return err;
        });  
    }

    async updateOne(input: UserInput): Promise<UserOutput> {
        return this._c.updateOne(
            { username: input.username }, 
            { password: input.password, role: input.role})
        .then(data => {
            const res: UserOutput = UserOutput.fromObject(data);
            return res;
            })
        .catch(err => {
            console.log(`[uid:${input.username}]: failed updateOne`,err)
            throw err;
        });   
    }

    async insertOne(input: UserInput): Promise<void> {
        const insertion = new User(
            { 
                username: input.username, 
                password: input.password, 
                role: input.role 
            }
        );
        
        await insertion.save().catch(err => {
            console.log(`[uid:${input.username}]: failed insertOne`,err);
            throw err;
        });
    }

    async deleteOne(username: String): Promise<void> {
        console.log(username);
        await User.deleteOne({username}).catch(err => {
            console.log(`[uid:${username}]: failed deleteOne`,err)
            throw err;
        });
    }
}