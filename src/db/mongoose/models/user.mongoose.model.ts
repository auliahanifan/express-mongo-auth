import conn from "../conn.mongoose";

const User = conn.model('User', {
            username: {
                type: String,
                index: true,
                unique: true
            },
            password: {
                type: String
            },
            role: {
                type: String,
                enum: ['ADMIN', 'COMMON']
            },
        }
    );

export = User;