const syrusClient = require('./syrusClient');
const { Task } = require('./task');
const { BaseStore } = require('@sapphire/framework');

class TaskStore extends BaseStore {
    constructor(client) {
        super(client, Task, {name: 'tasks'});
    }
}
module.exports = TaskStore