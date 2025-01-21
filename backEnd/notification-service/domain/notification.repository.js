class NotificationRepository {
    constructor(NotificationModel) {
        this.NotificationModel = NotificationModel;
    }

    async createNotification(notification) {
        return await this.NotificationModel.create(notification);
    }

    async getUserNotifications(userId) {
        return await this.NotificationModel.find({ userId }).sort({ createdAt: -1 });
    }

    async markAsRead(notificationId) {
        return await this.NotificationModel.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
    }
}

module.exports = NotificationRepository;
