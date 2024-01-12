const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content: String,
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('todo', todoSchema);