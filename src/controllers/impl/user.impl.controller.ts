// import { CustomerInput } from '../../dtos/inputs/customerInput';
// import { CustomerService } from '../../service/api/customerService';
import User from '../../db/mongoose/models/user.mongoose.model';
import { BaseResponse, createResponse, HttpStatus }  from '../../utils';
import { CrudController } from '../api/crud.api.controller';

export class CustomerControllerImpl implements CrudController {
    // private _customerService : CustomerService;

    constructor() {
        // this._customerService = customerService;
    }

    async getAll(req: any): Promise<BaseResponse> {
        // const result = await this._customerService.getAll();
        return createResponse(HttpStatus.OK, {});
    }

    async insertOne(req: any): Promise<BaseResponse> {
        const jsonBody = req.body;
        // const result = await this._customerService.insertOne(CustomerInput.fromObject(jsonBody));
        return createResponse(HttpStatus.OK, {});
    }

    async getOne(req: any): Promise<BaseResponse> {
        const userAdmin = await User.findOne({ username: 'admin' }).exec();
        return createResponse(HttpStatus.OK, userAdmin);
    }
    
    async updateOne(req: any): Promise<BaseResponse> {
        throw new Error('Method not implemented.');
    }
    async deleteOne(req: any): Promise<BaseResponse> {
        throw new Error('Method not implemented.');
    }
}