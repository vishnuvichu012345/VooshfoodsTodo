const User = require('./User');
const Task = require('./Task');

// One user can have many tasks
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Task };
