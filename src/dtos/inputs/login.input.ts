export class LoginInput {
    username: string;
    password: number;

    static create(
        username: string,
        password: number,
    ) : LoginInput {
        let input = new LoginInput;
        input.username = username;
        input.password = password;
        return input;
    }

    static fromObject(obj: object) : LoginInput {
        let input = new LoginInput();
        input.username = obj["username"];
        input.password = obj["password"];
        return input;
    }
}