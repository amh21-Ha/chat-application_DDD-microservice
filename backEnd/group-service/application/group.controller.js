class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }

    async createGroup(req, res) {
        try {
            const group = await this.groupService.createGroup(req.body);
            res.status(201).json(group);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addUserToGroup(req, res) {
        try {
            const { groupId, userId } = req.body;
            const updatedGroup = await this.groupService.addUserToGroup(groupId, userId);
            res.json(updatedGroup);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeUserFromGroup(req, res) {
        try {
            const { groupId, userId } = req.body;
            const updatedGroup = await this.groupService.removeUserFromGroup(groupId, userId);
            res.json(updatedGroup);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getGroupDetails(req, res) {
        try {
            const { groupId } = req.params;
            const group = await this.groupService.getGroupDetails(groupId);
            res.json(group);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = GroupController;
