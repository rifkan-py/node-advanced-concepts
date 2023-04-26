const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    res.statusCode = 403;
    if(!token) throw new Error("Authorization denied.")
    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = payload
        next()
    } catch(exception) {
        res.statusCode = 403;
        throw new Error("Authorization denied.")
    }
}

export default protect