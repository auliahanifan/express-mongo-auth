import { LoginInput } from '../../dtos/inputs/login.input';
import { BaseOutput }  from '../../utils';

export interface AuthService {
    login(input: LoginInput): Promise<BaseOutput<String>>;
    refreshToken(jwt: String): Promise<BaseOutput<String>>;
}