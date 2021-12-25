import { UserInput } from '../../dtos/inputs/user.input';
import { UserService } from '../../services/api/user.api.service';
import { BaseResponse, createResponse, HttpStatus, ServiceStatus }  from '../../utils';
import { CrudController } from '../api/crud.api.controller';

export class UserControllerImpl implements CrudController {
    private _userService : UserService;

    constructor(userService: UserService) {
        this._userService = userService;
    }

    async getAll(req: any): Promise<BaseResponse> {
        const result = await this._userService.getAll();

        if (result.status == ServiceStatus.OK) {
            return createResponse(HttpStatus.OK, result.body);
        }
        return createResponse(HttpStatus.BadRequest, {});
    }

    async insertOne(req: any): Promise<BaseResponse> {
        try {
            const jsonBody = req.body;
            const userInput = UserInput.fromObject(jsonBody);
            const result = await this._userService.insertOne(userInput);
    
            if (result.status == ServiceStatus.OK) {
                return createResponse(HttpStatus.Created, result.body);
            }
            return createResponse(HttpStatus.BadRequest, result.body);    
        } catch (error) {
            return createResponse(HttpStatus.BadRequest, error.message);            
        }
    }

    async getOne(req: any): Promise<BaseResponse> {
        try {
            const username = req.params.username;
            const result = await this._userService.getOne(username);
    
            if (result.status == ServiceStatus.OK) {
                return createResponse(HttpStatus.OK, result.body);
            }
            return createResponse(HttpStatus.BadRequest, result.body);
        } catch (error) {
            return createResponse(HttpStatus.BadRequest, error.message);            
        }
    }

    async updateOne(req: any): Promise<BaseResponse> {
        try {
            const jsonBody = req.body;
            const userInput = UserInput.fromObject(jsonBody);
            const result = await this._userService.updateOne(userInput);

            if (result.status == ServiceStatus.OK) {
                return createResponse(HttpStatus.OK, result.body);
            }
            return createResponse(HttpStatus.BadRequest, {});
            
        } catch (error) {
            return createResponse(HttpStatus.BadRequest, error.message);            
        }
        
    }

    async deleteOne(req: any): Promise<BaseResponse> {
        try {
            const username = req.params.username;
            const result = await this._userService.deleteOne(username);
    
            if (result.status == ServiceStatus.OK) {
                return createResponse(HttpStatus.OK, result.body);
            }
            return createResponse(HttpStatus.BadRequest, {});
        } catch (error) {
            return createResponse(HttpStatus.BadRequest, error.message);            
        }
    }
}