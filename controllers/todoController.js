const todo = require('../models/todo')

// handleError
const hadleErrorResponde = (res, errMessage) => {
    res.status
}

// create todo
const createTodoController = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error('User tidak ada, silakan login terlebih dahulu');
        };

        const { content } = req.body;
        if (!content) {
            throw new Error('Isi terlebih dahulu todo, tidak boleh kosong');
        };

        const newTodo = await todo.create({
            content,
            user: user.user_id
        });

        res.status(200).json({
            success: true,
            message: "Berhasil membuat todo",
            todo: newTodo
        });
        
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    };
};

// Melihat semua todo
const getAllTodoController = async (req, res) => {
    try {
        const todos = await todo.find({ user: req.user.user_id });
        res.status(200).json({
            success: true,
            message: "Berhasil melihat semua todo",
            todos
        });

    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    };
};

// Melihat detail todo
const getDetailTodoController = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todoDetail = await todo.findById(todoId);
        res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan detail todo",
            todoDetail
        });

    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    };
}

// update todo
const updateTodoController = async (req, res) => {
    try {
        const {todoId} = req.params;
        const { content, isCompleted } = req.body;

        // Memeriksa apakah ada perubahan pada content atau isCompleted
        const updateFields = {};

        if (content !== undefined) {
            updateFields.content = content;
        };

        if (isCompleted !== undefined) {
            updateFields.isCompleted = isCompleted;
        };

        // Memperbarui todo hanya dengan field yang valid
        const todoUpdate = await todo.findByIdAndUpdate(todoId, updateFields, { new: true });

        res.status(200).json({
            success: true,
            message: "Berhasil memperbarui todo",
            todo: todoUpdate
        });

    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    };
};

// delete todo
const deleteTodoController = async (req, res) => {
    try {
        const { todoId } = req.params
        const todoDelete = await todo.findByIdAndDelete(todoId)
        res.status(200).json({
            success: true,
            message: "Berhasil menghapus todo",
            todoDelete
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        });
    };
};


module.exports = {
    getAllTodoController,
    getDetailTodoController,
    createTodoController,
    updateTodoController,
    deleteTodoController
};