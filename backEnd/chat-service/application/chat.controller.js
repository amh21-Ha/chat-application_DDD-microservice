class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }

    async sendMessage(req, res) {
        try {
            const message = await this.chatService.sendMessage(req.body);
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getChatHistory(req, res) {
        try {
            const { userId1, userId2 } = req.params;
            const history = await this.chatService.getChatHistory(userId1, userId2);
            res.json(history);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = ChatController;
