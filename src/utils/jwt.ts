const jwt = require('jsonwebtoken');

const defaultJwtSecretToken = "a*x()2kj*mn";

const GenerateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_TOKEN ? process.env.JWT_SECRET_TOKEN : defaultJwtSecretToken, 
    { expiresIn: `${process.env.JWT_EXPIRED_SESSION ? process.env.JWT_EXPIRED_SESSION : 240 }h` });
}

const DecodeToken = (token) => {
    return jwt.decode(token, process.env.JWT_SECRET_TOKEN ? process.env.JWT_SECRET_TOKEN : defaultJwtSecretToken);
}

const AuthAllUser = (req, res) => {
    return AuthToken(req, res, false, false);
}

const AuthAdminOnly = (req, res) => {
    return AuthToken(req, res, true, false);
}

const AuthUserSelfLimit = async (req, res) => {
    return AuthToken(req, res, false, true);
}

const AuthToken = async (req, res, isAdminOnly, userSelfLimit) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({
        "status": 401,
        "message": "invalid token"
    })

    
    jwt.verify(token, process.env.JWT_SECRET_TOKEN ? process.env.JWT_SECRET_TOKEN : defaultJwtSecretToken, async (err, user) => {
        if (err) return res.status(403).json({
            "status": 403,
            "message": "invalid token"
        })
        
        const data = await DecodeToken(token);

        if ((data.role) !== "ADMIN") {
            if (isAdminOnly) {
                return res.status(401).json({
                    "status": 401,
                    "message": "you should be admin"
                })
            }

            if (userSelfLimit) {
                if (req.params.username != data.username) {
                    return res.status(401).json({
                        "status": 401,
                        "message": "cannot read other user"
                    })
                }
            }
        }
        
        req.token = user
    });
}

export {
    GenerateToken,
    DecodeToken,
    AuthAllUser,
    AuthAdminOnly,
    AuthUserSelfLimit
}