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
    console.log('seeder: admin duplicate')
});

const commonuser = new User(
    { 
        username: 'commonuser', 
        password: HashPassword('commonuser'), 
        role: 'COMMON' 
    }
);

commonuser.save().then(() => console.log('seeder: commonuser created')).catch(e => {
    console.log('seeder: commonuser duplicate')
});
