export class AuthResult {
    accessToken: string;
    refreshToken: string;

    static create(
        accessToken: string,
        refreshToken: string,
    ) : AuthResult {
        let input = new AuthResult;
        input.accessToken = accessToken;
        input.refreshToken = refreshToken;
        return input;
    }

    static fromObject(obj: object) : AuthResult {
        let input = new AuthResult();
        input.accessToken = obj["accessToken"];
        input.refreshToken = obj["refreshToken"];
        return input;
    }
}