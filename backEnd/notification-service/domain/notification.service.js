class NotificationService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async sendNotification(notificationId, userId, type, message) {
        const notification = {
            notificationId,
            userId,
            type,
            message,
        };
        return await this.notificationRepository.createNotification(notification);
    }

    async getNotifications(userId) {
        return await this.notificationRepository.getUserNotifications(userId);
    }

    async markNotificationAsRead(notificationId) {
        return await this.notificationRepository.markAsRead(notificationId);
    }
}

module.exports = NotificationService;
