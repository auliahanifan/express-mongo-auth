import { HttpStatus, createResponse, BaseResponse }  from '../../utils';
import { HelloWorldResult } from '../../dtos/results/helloWorld.result';

export class HelloWorldController {

    async getHelloWorld(req: any): Promise<BaseResponse> {
        return createResponse(HttpStatus.OK, new HelloWorldResult());
    }

}