class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }

    async sendNotification(req, res) {
        try {
            const { userId, type, message } = req.body;
            const notification = await this.notificationService.sendNotification(userId, type, message);
            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getNotifications(req, res) {
        try {
            const { userId } = req.params;
            const notifications = await this.notificationService.getNotifications(userId);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async markNotificationAsRead(req, res) {
        try {
            const { notificationId } = req.params;
            const notification = await this.notificationService.markNotificationAsRead(notificationId);
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = NotificationController;
