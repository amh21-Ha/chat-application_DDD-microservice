const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model('Message', messageSchema);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/chat-service', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Chat database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = { connectDB, MessageModel };
