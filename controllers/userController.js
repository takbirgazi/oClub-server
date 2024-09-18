// controllers/userController.js
const connectToDatabase = require('../config/db');

const getAllUsers = async (req, res) => {
    const { usersCollection } = await connectToDatabase();
    
    const users = await usersCollection.find().toArray();
    res.json(users);
};

const searchUsers = async (req, res) => {
    const query = req.query;
    const { division, bloodGroup } = query;
    const { usersCollection } = await connectToDatabase();
    
    const users = await usersCollection.find({
        $or: [{ division }, { bloodGroup }]
    }).toArray();
    
    res.json(users);
};

const addUser = async (req, res) => {
    const newUser = req.body;
    const { usersCollection } = await connectToDatabase();
    
    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User added successfully!" });
};

module.exports = { getAllUsers, searchUsers, addUser };