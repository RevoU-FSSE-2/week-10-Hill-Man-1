const { MongoClient } = require('mongodb');

const dbMiddleware = async (req, res, next) => {
    const mongoClient = await new MongoClient ('mongodb://127.0.0.1:27017').connect()
    db =  mongoClient.db ('w10-db')

    req.db = db

    next()
}

module.exports = dbMiddleware