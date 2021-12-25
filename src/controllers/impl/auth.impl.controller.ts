import { LoginInput } from '../../dtos/inputs/login.input';
import { AuthService } from '../../services/api/auth.api.service';
import { BaseResponse, createResponse, HttpStatus, ServiceStatus }  from '../../utils';
import { AuthController } from '../api/auth.api.controller';

export class AuthControllerImpl implements AuthController {
    private _authService : AuthService;

    constructor(authService: AuthService) {
        this._authService = authService;
    }
    async login(req: any): Promise<BaseResponse> {
        const jsonBody = req.body;
        const result = await this._authService.login(LoginInput.fromObject(jsonBody));
        
        if (result.status == ServiceStatus.OK) {
            return createResponse(HttpStatus.OK, result.body);
        }

        return createResponse(HttpStatus.BadRequest, null);
    }

    // NOT YET IMPLEMENTED
    async refreshToken(req: any): Promise<BaseResponse> {
        throw new Error('Method not implemented.');
    }
}