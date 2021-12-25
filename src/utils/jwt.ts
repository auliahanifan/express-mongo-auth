const jwt = require('jsonwebtoken');

const defaultJwtSecretToken = "a*x()2kj*mn";

const GenerateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_TOKEN ? process.env.JWT_SECRET_TOKEN : defaultJwtSecretToken, 
    { expiresIn: `${process.env.JWT_EXPIRED_SESSION ? process.env.JWT_EXPIRED_SESSION : 240 }h` });
}

const DecodeToken = (token) => {
    return jwt.decode(token);
}

const AuthAllUser = (req, res, next) => {
    return AuthToken(req, res, next, false);
}

const AuthAdminOnly = (req, res, next) => {
    return AuthToken(req, res, next, true);
}

const AuthToken = (req, res, next, isAdmin) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401).json({
        "status": 401,
        "message": "invalid token"
    })

    const data = DecodeToken(token);

    if (isAdmin) {
        if ((data.role) !== "ADMIN") {
            return res.sendStatus(403).json({
                "status": 403,
                "message": "you should be admin"
            })
        }
    }

    jwt.verify(token, process.env.JWT_SECRET_TOKEN ? process.env.JWT_SECRET_TOKEN : defaultJwtSecretToken, (err, user) => {
        if (err) return res.sendStatus(403).json({
            "status": 403,
            "message": "invalid token"
        })
        req.token = user
        next()
    });
}

export {
    GenerateToken,
    DecodeToken,
    AuthAllUser,
    AuthAdminOnly
}