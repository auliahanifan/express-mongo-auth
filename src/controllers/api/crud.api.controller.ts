import { BaseResponse }  from '../../utils';

export interface CrudController {
    getOne(req: any): Promise<BaseResponse>;
    getAll(req: any): Promise<BaseResponse>;
    insertOne(req: any): Promise<BaseResponse>;
    updateOne(req: any): Promise<BaseResponse>;
    deleteOne(req: any): Promise<BaseResponse>;
}