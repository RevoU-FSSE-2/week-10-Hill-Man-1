const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SIGN } = require('../config/jwt.js');

const register = async (req, res, next) => {
    const { username, password, role } = req.body;

    try {
        const user = await req.db.collection('users').findOne({ username });
        if (user) {
            throw new Error('Username Already Exists');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await req.db.collection('users').insertOne({
            username,
            password: hashPassword,
            role
        });

        res.status(201).json({
            message: 'User registration successful',
            data: newUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await req.db.collection('users').findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, JWT_SIGN);
        res.status(200).json({
            message: `${user.username} Login successful`,
            data: token
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };
