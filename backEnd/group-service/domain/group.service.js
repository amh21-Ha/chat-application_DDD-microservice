class GroupService {
    constructor(groupRepository, rabbitMQ) {
        this.groupRepository = groupRepository;
        this.rabbitMQ = rabbitMQ;
    }

    async createGroup(groupData) {
        const group = await this.groupRepository.createGroup(groupData);
        await this.rabbitMQ.sendMessage('notifications', { event: 'groupCreated', data: group });
        return group;
    }

    async addUserToGroup(groupId, userId) {
        const updatedGroup = await this.groupRepository.addUserToGroup(groupId, userId);
        await this.rabbitMQ.sendMessage('notifications', { event: 'userAddedToGroup', data: { groupId, userId } });
        return updatedGroup;
    }

    async removeUserFromGroup(groupId, userId) {
        const updatedGroup = await this.groupRepository.removeUserFromGroup(groupId, userId);
        return updatedGroup;
    }

    async getGroupDetails(groupId) {
        return await this.groupRepository.getGroupDetails(groupId);
    }
}
module.exports = GroupService;
