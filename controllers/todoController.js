const todo = require('../models/todo')

// helper respond
const respond = (res, success, message, data = null) => {
    const status = success ? 200 : 401;
    const responseData = data ? { success, message, data } : { success, message };
    res.status(status).json(responseData);
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

        respond(res, true, "Berhasil membuat todo", newTodo);
        
    } catch (err) {
        respond(res, false, err.message);
    };
};

// Melihat semua todo
const getAllTodoController = async (req, res) => {
    try {
        const todos = await todo.find({ user: req.user.user_id });
        respond(res, true, "Berhasil melihat semua todo", todos);

    } catch (err) {
        respond(res, false, err.message);
    };
};

// Melihat detail todo
const getDetailTodoController = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todoDetail = await todo.findById(todoId);
        
        if (!todoDetail) {
            respond(res, false, "Todo tidak ditemukan", null);
            return;
        }

        respond(res, true, "Berhasil mendapatkan detail todo", todoDetail);

    } catch (err) {
        respond(res, false, err.message);
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

        if (!todoUpdate) {
            respond(res, false, "Todo tidak ditemukan");
            return;
        }

        respond(res, true, "Berhasil memperbarui todo", todoUpdate);

    } catch (err) {
        respond(res, false, err.message);
    };
};

// delete todo
const deleteTodoController = async (req, res) => {
    try {
        const { todoId } = req.params;
        const deletedTodo = await todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            respond(res, false, "Todo tidak ditemukan");
            return;
        }

        respond(res, true, "Berhasil menghapus todo");

    } catch (err) {
        respond(res, false, err.message);
    };
};

// delete semua todo
const deleteAllTodoController = async (req,res) => {
    try {
        await todo.deleteMany({});
        respond(res, true, "Berhasil menghapus semua todo");

    } catch (err) {
        respond(res, false, err.message);
    }
};


module.exports = {
    getAllTodoController,
    getDetailTodoController,
    createTodoController,
    updateTodoController,
    deleteTodoController,
    deleteAllTodoController
};