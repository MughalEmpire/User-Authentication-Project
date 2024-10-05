const express = require('express');
const mongoose = requie('mongoose');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
const authmiddleware = require('./middleware/authmiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/routes', authmiddleware);

mongoose.connect(process.env.MONGO_URL, {new: useNewUrlParser, useUnifiedTopology: true})
.then(() => console.log("MongoDB Successfully connected!"))
.catch(error => console.log("Error"));

app.get('/protected', authmiddleware, (req, res) => {
    res.send(`Hello user${req.user}, this is a protected route`);
})

app.get('/', async(req, res) => {
    res.send('Welcome to the node JWT authentication ');
});

app.listen(PORT, () => console.log(`Server is listening on the http://localhost:27107:${PORT}`));

// This is a server.js file that consists of importing the packages, connecting the database connection with backend node.js server. Moreover, the file includes protecting the routes for user and finally the backend server is listening on the 3000 port. 

