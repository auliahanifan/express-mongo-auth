import { UserAccessor } from "../../accessors/api/user.api.accessor";
import { UserInput } from "../../dtos/inputs/user.input";
import { UserOutput } from "../../dtos/outputs/user.output";
import { BaseOutput, createOutput, ServiceStatus } from "../../utils";
import { UserService } from "../api/user.api.service";
import { HashPassword } from '../../utils/crypto';

export class UserServiceImpl implements UserService {
    private _userAccessor : UserAccessor;

    constructor(userAccessor: UserAccessor) {
        this._userAccessor = userAccessor;
    }

    async getAll(): Promise<BaseOutput<UserOutput[]>> {
        try {
            const userList = await this._userAccessor.getAll();
            return createOutput(ServiceStatus.OK, userList); 
        } catch(e) {
            console.log('userService.getAll()',e);
            return createOutput(ServiceStatus.Error, null); 
        }
    }
    
    async getOne(username: string): Promise<BaseOutput<UserOutput>> {
        try {
            const user = await this._userAccessor.getOne(username);
            return createOutput(ServiceStatus.OK, user); 
        } catch (e) {
            console.log(`userService.getOne(${username})`,e);
            return createOutput(ServiceStatus.Error, null); 
        }
    }
    
    async updateOne(input: UserInput): Promise<BaseOutput<UserOutput>> {
        try {
            input.setPassword(HashPassword(input.password));
            const user = await this._userAccessor.updateOne(input);
            return createOutput(ServiceStatus.OK, user); 
        } catch (e) {
            console.log(`userService.getOne(${input.username})`,e);
            return createOutput(ServiceStatus.Error, null); 
        }
    }
    
    async insertOne(input: UserInput): Promise<BaseOutput<null>> {
        try {
            input.setPassword(HashPassword(input.password));
            await this._userAccessor.insertOne(input);
            return createOutput(ServiceStatus.OK, null); 
        } catch (e) {
            console.log(`userService.insertOne(${input.username})`,e);
            return createOutput(ServiceStatus.Error, e.message); 
        }
    }
    
    async deleteOne(username: string): Promise<BaseOutput<null>> {
        try {
            await this._userAccessor.deleteOne(username);
            return createOutput(ServiceStatus.OK, null); 
        } catch (e) {
            console.log(`userService.getOne(${username})`,e);
            return createOutput(ServiceStatus.Error, null); 
        }
    }
}
