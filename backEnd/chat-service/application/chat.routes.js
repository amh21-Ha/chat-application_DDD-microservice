const express = require('express');
const router = express.Router();

module.exports = (chatController) => {
    router.post('/send', (req, res) => chatController.sendMessage(req, res));
    router.get('/history/:userId1/:userId2', (req, res) => chatController.getChatHistory(req, res));
    return router;
};
