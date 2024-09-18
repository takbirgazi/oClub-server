// index.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', userRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome...');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
