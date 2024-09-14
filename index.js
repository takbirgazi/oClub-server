const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB
const uri = `mongodb+srv://${process.env.dbUserName}:${process.env.dbUserPassword}@cluster0.eklml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    const database = client.db("oClub");
    const allUsers = database.collection("users");
    try {
        app.get("/users", async (req, res) => {
            const data = await allUsers.find().toArray();
            res.send(data);
        });
        app.get("/users/search", async (req, res) => {
            const query = req.query;
            const division = query.division;
            const bloodGroup = query.bloodGroup;
            const data = await allUsers.find({
                $or: [
                    { division },
                    { bloodGroup }
                ]
            }).toArray();
            res.send(data);
        });
        app.post("/users", (req, res) => {
            const usersInfo = req.body;
            const addUser = allUsers.insertOne(usersInfo);
            res.send("User Added Successfully");
        });
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

// MongoDB
app.get("/", (req, res) => {
    res.send("Welcome...")
});
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});