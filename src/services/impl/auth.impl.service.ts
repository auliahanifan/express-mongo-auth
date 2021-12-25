import { UserAccessor } from "../../accessors/api/user.api.accessor";
import { LoginInput } from "../../dtos/inputs/login.input";
import { BaseOutput, createOutput, ServiceStatus } from "../../utils";
import { ValidateAuth } from "../../utils/crypto";
import { GenerateToken } from "../../utils/jwt";
import { AuthService } from "../api/auth.api.service";

export class AuthServiceImpl implements AuthService {
    private _userAccessor : UserAccessor;

    constructor(userAccessor: UserAccessor) {
        this._userAccessor = userAccessor;
    }

    async login(input: LoginInput): Promise<BaseOutput<String>> {
        const user = await this._userAccessor.getOne(input.username);

        const isValid = ValidateAuth(input.password, user.password);
        if (isValid) {
            const token = GenerateToken({
                username: user.username,
                role: user.role
            });
            return createOutput(ServiceStatus.OK, token);
        }
        
        return createOutput(ServiceStatus.Error, '')
    }

    // NOT YET IMPLEMENTED
    refreshToken(jwt: String): Promise<BaseOutput<String>> {
        throw new Error("Method not implemented.");
    }
}