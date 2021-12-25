import { UserInput } from '../../dtos/inputs/user.input';
import { UserOutput } from '../../dtos/outputs/user.output';
import { BaseOutput }  from '../../utils';

export interface UserService {
    getAll(): Promise<BaseOutput<Array<UserOutput>>>;

    getOne(username: string): Promise<BaseOutput<UserOutput>>;
    
    updateOne(input: UserInput): Promise<BaseOutput<UserOutput>>;
    
    insertOne(input: UserInput): Promise<BaseOutput<null>>;
    
    deleteOne(username: string): Promise<BaseOutput<null>>;
}