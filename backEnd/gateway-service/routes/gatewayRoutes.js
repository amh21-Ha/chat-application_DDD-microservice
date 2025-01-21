const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

// Configuration for microservices
const SERVICES = {
    userService: 'http://localhost:3001',
    chatService: 'http://localhost:3002',
    groupService: 'http://localhost:3003',
    notificationService: 'http://localhost:3004',
};

// User Service routes
router.use('/users', createProxyMiddleware({ target: SERVICES.userService, changeOrigin: true }));

// Chat Service routes
router.use('/chats', createProxyMiddleware({ target: SERVICES.chatService, changeOrigin: true }));

// Group Service routes
router.use('/groups', createProxyMiddleware({ target: SERVICES.groupService, changeOrigin: true }));

// Notification Service routes
router.use('/notifications', createProxyMiddleware({ target: SERVICES.notificationService, changeOrigin: true }));

module.exports = router;
