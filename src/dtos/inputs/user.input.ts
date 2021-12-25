import { UserRole } from "../common/userRole.enum";

export class UserInput {
    username: string;
    password: string;
    role: string;

    static create(
        username: string,
        password: string,
        role: string
    ) : UserInput {
        let input = new UserInput;
        input.username = username;
        input.password = password;
        input.role = role;
        return input;
    }

    static fromObject(obj: object) : UserInput {
        let input = new UserInput();
        input.username = obj["username"];
        input.password = obj["password"];
        input.role = obj["role"];
        var role : UserRole = UserRole[input.role];
        if (role == undefined) throw new Error("user Role doesnt exist");

        return input;
    }

    public setPassword(v : string) {
        this.password = v;
    }
}