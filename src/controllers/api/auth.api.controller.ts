import { BaseResponse }  from '../../utils';

export interface AuthController {
    login(req: any): Promise<BaseResponse>;
    refreshToken(req: any): Promise<BaseResponse>;
}