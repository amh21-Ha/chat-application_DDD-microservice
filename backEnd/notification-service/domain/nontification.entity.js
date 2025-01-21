class Notification {
    constructor({ id, userId, type, message, isRead, createdAt }) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.message = message;
        this.isRead = isRead || false;
        this.createdAt = createdAt || new Date();
    }
}

module.exports = Notification;
