const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        const token = authHeader.split(' ')[1]
    } else {
        res.status(401).json({ error:'unauthorized' })
        try {
            const decodedToken = jwt.verify(token, JWT_SIGN)
            console.log(decodedToken,"decoded token: ");
            next()
        } catch (error) { 
            res.status(400).json({error: error.message})
        }
    }
}

module.exports = { authMiddleware }