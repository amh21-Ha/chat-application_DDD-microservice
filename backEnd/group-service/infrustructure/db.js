const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: { type: [String], required: true }, // Array of user IDs
    createdBy: { type: String, required: true }, // Creator's user ID
    createdAt: { type: Date, default: Date.now },
});

const GroupModel = mongoose.model('Group', groupSchema);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/group-service', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Group database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = { connectDB, GroupModel };
