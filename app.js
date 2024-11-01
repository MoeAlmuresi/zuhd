const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post'); // Adjust the path if necessary

const app = express();
const port = 3000; // Use your desired port

app.use(express.json()); // Middleware to parse JSON request bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/zuhddb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/register', async (req, res) => {
    try{
        const {username, password} = req.body;
    

    const newUser = new User({
        username,
        password
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
}   catch (error){
    console.error(error);
    res.status(500).json({message: 'Error creating user', error: error.message});

}
});

// Create Post Endpoint
app.post('/posts', async (req, res) => {
    try {
        const { title, content, author } = req.body;

        // Create a new post instance
        const newPost = new Post({
            title,
            content,
            author
        });

        // Save the post to the database
        const savedPost = await newPost.save();

        // Respond with the created post
        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
