const Task = require('../models/Task');

const getTasks = async(req, res) => {
    try {
        const { userId } = req;
        const tasks = await Task.find(
                {
                    user_id: userId
                }
            ).populate('user_id', ['name', 'email']);

        return res.json({
            message: 'getTasks',
            data: tasks
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting tasks'
        });                
    }
};

const getTaskById = async(req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req;

        const task = await Task.findOne({
            _id: id,
            user_id: userId
        })
        .populate('user_id',['name','email']);

        if(!task) {
            return res.json({
                success: false,
                message: 'Task not found',
                data: []
            });
        };

        return res.json(
            {
                success: true,
                message: 'getTaskById',
                data: task
            }
        );
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting task'
        });        
    }
};

const createTask = async(req, res) => {
    try {
        const { name, description } = req.body;
        const { userId } = req;

        const task = new Task({
            name,
            description,
            user_id: userId
        });
    
        await task.save();
    
        return res.json({
            message: 'createTask'
        });   
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }    
};

const updateTask = (req, res) => {
    return res.json({
        message: 'updateTask'
    });
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req;

        const task = await Task.findOne({
            _id: id,
            user_id: userId
        })

        if (!task) {
            return res.json({
                success: false,
                message: 'Task not found',
                data: []
            });
        }

        await task.remove();

        return res.json({
            success: true,
            message: 'deleteTask-> ' + id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting task'
        });
    }
};

const updateTaskStatus = async(req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req;

        const task = await Task.findOne(
            {
                _id: id,
                user_id: userId
            }
        );
        task.status = !task.status;    
        task.save();

        return res.json({
            success: true,
            message: 'UpdateTaskStatus-> ' + id,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating task status'
        });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
};
