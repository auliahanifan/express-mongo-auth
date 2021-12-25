import { LoginInput } from '../../dtos/inputs/login.input';
import { AuthResult } from '../../dtos/results/auth.result';
import { BaseOutput }  from '../../utils';

export interface AuthService {
    login(input: LoginInput): Promise<BaseOutput<AuthResult>>;
    refreshToken(jwt: String): Promise<BaseOutput<AuthResult>>;
}