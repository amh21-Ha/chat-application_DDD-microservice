const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./infrastructure/db');
const notificationRoutes = require('./application/notification.routes');

const app = express();
app.use(bodyParser.json());

app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3004;

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Notification Service running on port ${PORT}`);
    });
});
