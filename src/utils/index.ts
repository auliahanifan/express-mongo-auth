// For Controller Level
export class BaseResponse {
    status: HttpStatus;
    body: any;

    constructor(status: HttpStatus, body: any) {
        this.status = status;
        this.body = body;
    }
}

// For Service Level
export class BaseOutput<T> {
    status: ServiceStatus;
    body: T;

    constructor(status: ServiceStatus, body: T) {
        this.status = status;
        this.body = body;
    }
}

export enum HttpStatus {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401
}

export enum ServiceStatus {
    OK,
    Error
}

export function createResponse (status: HttpStatus, body: any) {
    return new BaseResponse(status, body);
}   

export function createOutput (status: ServiceStatus, body: any) {
    return new BaseOutput(status, body);
}   