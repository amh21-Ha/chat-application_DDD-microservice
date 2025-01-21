class Group {
    constructor(id, name, members, createdBy, createdAt) {
        this.id = id;
        this.name = name;
        this.members = members; // Array of user IDs
        this.createdBy = createdBy; // User ID of the creator
        this.createdAt = createdAt || new Date();
    }
}
module.exports = Group;
