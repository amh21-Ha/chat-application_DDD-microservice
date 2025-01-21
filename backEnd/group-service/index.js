const express = require('express');
const { connectDB, GroupModel } = require('./infrastructure/db');
const { connectRabbitMQ, sendMessage } = require('./infrastructure/rabbit');
const GroupRepository = require('./domain/group.repository');
const GroupService = require('./domain/roup.Service');
const GroupController = require('./application/group.controller');
const groupRoutes = require('./application/group.routes');

const app = express();
app.use(express.json());

// Dependency injection
class MongoGroupRepository extends GroupRepository {
    async createGroup(groupData) {
        const group = new GroupModel(groupData);
        return await group.save();
    }
    async addUserToGroup(groupId, userId) {
        return await GroupModel.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } },
            { new: true }
        );
    }
    async removeUserFromGroup(groupId, userId) {
        return await GroupModel.findByIdAndUpdate(
            groupId,
            { $pull: { members: userId } },
            { new: true }
        );
    }
    async getGroupDetails(groupId) {
        return await GroupModel.findById(groupId);
    }
}

const groupRepository = new MongoGroupRepository();
const groupService = new GroupService(groupRepository, { sendMessage });
const groupController = new GroupController(groupService);

// Routes
app.use('/groups', groupRoutes(groupController));

// Start services
connectDB();
connectRabbitMQ();
app.listen(3002, () => console.log('Group service running on port 3002'));
