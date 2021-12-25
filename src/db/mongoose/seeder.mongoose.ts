import { HashPassword } from "../../utils/crypto";
import User from "./models/user.mongoose.model";

const admin = new User(
    { 
        username: 'admin', 
        password: HashPassword('admin'), 
        role: 'ADMIN' 
    }
);

admin.save().then(() => console.log('seeder: admin created')).catch(e => {
    console.log('seeder: admin is already created')
});

const user = new User(
    { 
        username: 'user', 
        password: HashPassword('user'), 
        role: 'COMMON' 
    }
);

user.save().then(() => console.log('seeder: user created')).catch(e => {
    console.log('seeder: user is already created')
});
