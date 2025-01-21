const express = require('express');
const { connectDB, MessageModel } = require('./infrastructure/db');
const { connectRabbitMQ, sendMessage } = require('./infrastructure/rabbit');
const ChatRepository = require('./domain/chat.repository');
const ChatService = require('./domain/chat.service');
const ChatController = require('./application/chat.controller');
const chatRoutes = require('./application/chat.routes');

const app = express();
app.use(express.json());

// Dependency injection
class MongoChatRepository extends ChatRepository {
    async saveMessage(messageData) {
        const message = new MessageModel(messageData);
        return await message.save();
    }
    async getMessagesBetweenUsers(userId1, userId2) {
        return await MessageModel.find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 },
            ],
        }).sort({ timestamp: 1 });
    }
}

const chatRepository = new MongoChatRepository();
const chatService = new ChatService(chatRepository, { sendMessage });
const chatController = new ChatController(chatService);

// Routes
app.use('/chats', chatRoutes(chatController));

// Start services
connectDB();
connectRabbitMQ();
app.listen(3001, () => console.log('Chat service running on port 3001'));
