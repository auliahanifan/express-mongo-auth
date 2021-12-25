export class UserOutput {
    username: string;
    password: number;
    role: string;

    static create(
        username: string,
        password: number,
        role: string
    ) : UserOutput {
        let input = new UserOutput;
        input.username = username;
        input.password = password;
        input.role = role;
        return input;
    }

    static fromObject(obj: object) : UserOutput {
        let input = new UserOutput();
        input.username = obj["username"];
        input.password = obj["password"];
        input.role = obj["role"];
        return input;
    }
}