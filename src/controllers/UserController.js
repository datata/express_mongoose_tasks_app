const User = require('../models/User');
const mongoose = require('mongoose');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({},['-_password']);

        return res.json({
            success: true,
            message: 'Users found',
            data: users
        });
    } catch (error) {
        return res.json({
            success: false,
            message: {
                error: 'Error getting users'
            }
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const isMongooseObjectId = mongoose.Types.ObjectId.isValid(id);

        if (!isMongooseObjectId) {
            return res.json({ succes:true, data: [], message: 'Invalid id'  });
        }
        const user = await User.findById(id).select(['-password']);

        if(!user) {
            return res.json({  success: true, data: [], message: 'User not found'  });
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
}

const updateUserByid = async (req, res) => {
    try {
        const { id } = req.params;
        const isMongooseObjectId = mongoose.Types.ObjectId.isValid(id);

        if (!isMongooseObjectId) {
            return res.json({ succes:true, data: [], message: 'Invalid id' });
        }

        const userDelete = await User.findById(id);

        if(!userDelete) {
            return res.json({ success: true, data: [], message: 'User not found' });
        }
        
        const { name, password } = req.body;

        const userData = {
            name,
            password
        };

        const user = await User.findByIdAndUpdate(id, userData, { new: true }).select(['-password'])

        return res.json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        return res.json({
            success: false,
            message: {
                error: 'Error updating user'
            }
        });
    }
}

const deleteUserByid = async (req, res) => {
    try {
        const { id } = req.params;

        const isMongooseObjectId = mongoose.Types.ObjectId.isValid(id);

        if (!isMongooseObjectId) {
            return res.json({ success:true, data: [], message: 'Invalid id' });
        }

        const userDelete = await User.findById(id);

        if(!userDelete) {
            return res.json({ success:true, data: [], message: 'User not found' });
        }

        userDelete.remove();
    
        return res.json(
            {
                success: true,
                message: 'User with id: ' + id + ' deleted',
                data: []
            }
        )
    } catch (error) {
        return res.json({ 
            success: false,
            message: {
                error: 'Error deleting user' 
            }
        });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUserByid,
    deleteUserByid,
};