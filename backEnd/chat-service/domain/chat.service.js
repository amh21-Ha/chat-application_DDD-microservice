class ChatService {
    constructor(chatRepository, rabbitMQ) {
        this.chatRepository = chatRepository;
        this.rabbitMQ = rabbitMQ;
    }

    async sendMessage(messageData) {
        const message = await this.chatRepository.saveMessage(messageData);
        await this.rabbitMQ.sendMessage('notifications', { event: 'newMessage', data: message });
        return message;
    }

    async getChatHistory(userId1, userId2) {
        return await this.chatRepository.getMessagesBetweenUsers(userId1, userId2);
    }
}
module.exports = ChatService;
