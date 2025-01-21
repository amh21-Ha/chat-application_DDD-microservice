const express = require('express');
const router = express.Router();

module.exports = (groupController) => {
    router.post('/create', (req, res) => groupController.createGroup(req, res));
    router.post('/add', (req, res) => groupController.addUserToGroup(req, res));
    router.post('/remove', (req, res) => groupController.removeUserFromGroup(req, res));
    router.get('/:groupId', (req, res) => groupController.getGroupDetails(req, res));
    return router;
};
