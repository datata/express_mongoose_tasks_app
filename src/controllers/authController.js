const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.json({
                success: false,
                message: 'User email already exists',
                data: []
            });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password
        });

        user.password = encryptedPassword;

        const newUser = await user.save();

        const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 * 24 }
        );

        console.log(token);

        return res.json({
            success: true,
            message: 'User created successfully',
            data: newUser,
            token
        });
    } catch (error) {
        return res.json({
            success: false,
            message: {
                error: 'Error creating user'
            }
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: 'User not found',
                data: []
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({
                success: false,
                message: 'Invalid email or password',
                data: []
            });
        }

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 * 24 }
        );

        return res.json({
            success: true,
            message: 'User logged in successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            token
        });
    } catch (error) {
        return res.json({
            success: false,
            message: {
                error: 'Error logging in user'
            }
        });
    }
};

const me = async (req, res) => {
    try {
        const { userId } = req;

        const user = await User.findById(userId).select(['-password']);

        if (!user) {
            return res.json({
                success: false,
                message: 'User not found',
                data: []
            });
        }

        return res.json({
            success: true,
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        return res.json({
            success: false,
            message: {
                error: 'Error retrieving user'
            }
        });
    }
};

module.exports = {
    register,
    login,
    me
};