const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const NotificationModel = mongoose.model('Notification', notificationSchema);

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/notification-service', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to Notification Database');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

module.exports = { connectToDatabase, NotificationModel };
