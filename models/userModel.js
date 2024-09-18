// models/userModel.js
const users = [];

const UserModel = {
    getAllUsers: () => users,

    addUser: (user) => {
        users.push(user);
    },

    getUserById: (id) => {
        return users.find(user => user.id === id);
    }
};

module.exports = UserModel;
