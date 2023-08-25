const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')

const authorizAdmin = (req, res, next) => {
    const autHeader = req.headers.authorization
    if (!autHeader) {
        res.status(403).json({ error: 'unauthorized'}) 
    } else {
        const token = autHeader.split (' ')[1]
        try {
            const decodedToken = jwt.verify(token, JWT_SIGN)
            if (decodedToken.role === 'admin') {
                next()
            } else {
                res.status(403).json({ error: 'unauthorized' })
            }
        } catch (error) {
            res.status(403).json({ error: error.message })
        }
    }
}

const authorizMaker = (req, res, next) => {
    const autHeader = req.headers.authorization
    if (!autHeader) {
        res.status(403).json({ error: 'unauthorized'}) 
    } else {
        const token = autHeader.split (' ')[1]
        try {
            const decodedToken = jwt.verify(token, JWT_SIGN)
            if (decodedToken.role === 'maker') {
                next()
            } else {
                res.status(403).json({ error: 'unauthorized' })
            }
        } catch (error) {
            res.status(403).json({ error: error.message })
        }
    }
}

const authorizApprover = (req, res, next) => {
    const autHeader = req.headers.authorization
    if (!autHeader) {
        res.status(403).json({ error: 'unauthorized'}) 
    } else {
        const token = autHeader.split (' ')[1]
        try {
            const decodedToken = jwt.verify(token, JWT_SIGN)
            if (decodedToken.role === 'approver') {
                next()
            } else {
                res.status(403).json({ error: 'unauthorized' })
            }
        } catch (error) {
            res.status(403).json({ error: error.message })
        }
    }
}

module.exports = { authorizAdmin, authorizMaker, authorizApprover};