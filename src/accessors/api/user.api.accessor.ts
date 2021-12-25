import { UserInput } from '../../dtos/inputs/user.input';
import { UserOutput } from '../../dtos/outputs/user.output';

export interface UserAccessor {
    getAll(): Promise<Array<UserOutput>>;

    getOne(username: String): Promise<UserOutput>;
    
    updateOne(input: UserInput): Promise<UserOutput>;
    
    insertOne(input: UserInput): Promise<void>;
    
    deleteOne(username: String): Promise<void>;
}