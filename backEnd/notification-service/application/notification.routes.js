const express = require('express');
const NotificationController = require('../notification.controller');
const NotificationRepository = require('../../domain/notification.repository');
const NotificationService = require('../../domain/notification.service');
const { NotificationModel } = require('../../infrastructure/db');

const router = express.Router();
const notificationRepository = new NotificationRepository(NotificationModel);
const notificationService = new NotificationService(notificationRepository);
const notificationController = new NotificationController(notificationService);

router.post('/', (req, res) => notificationController.sendNotification(req, res));
router.get('/:userId', (req, res) => notificationController.getNotifications(req, res));
router.patch('/:notificationId', (req, res) => notificationController.markNotificationAsRead(req, res));

module.exports = router;
