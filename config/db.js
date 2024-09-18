// config/db.js
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.dbUserName}:${process.env.dbUserPassword}@cluster0.eklml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        const database = client.db("oClub");
        const usersCollection = database.collection("users");
        const products = database.collection("products");
        return { usersCollection, products };
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}

module.exports = connectToDatabase; 